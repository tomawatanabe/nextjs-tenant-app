import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/dist/server/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/items");
  const data = await res.json();

  const paths = await data.map((item: any) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const request = await fetch(`http://localhost:3000/api/items/${params.id}`);
  const postData = await request.json();

  return {
    props: { postData },
  };
};

const EditPage = ({ postData }: any) => {
  const router = useRouter();

  const [editItemName, setEditItemName] = useState(postData.name);
  const [editItemPrice, setEditItemPrice] = useState(postData.price);
  const [editItemDescription, setEditItemDescription] = useState(
    postData.description
  );
  const [editItemImageURL, setEditItemImageURL] = useState(postData.imageURL);

  const handleChangeEditItemName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditItemName(e.target.value);
  };

  const handleChangeEditItemPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setEditItemPrice(Number(e.target.value));
  };

  const handleChangeEditItemDescription = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEditItemDescription(e.target.value);
  };

  const handleChangeItemImageURL = (e: ChangeEvent<HTMLInputElement>) => {
    setEditItemImageURL(e.target.value);
  };

  return (
    <>
      <Head><title>商品編集</title></Head>
      <Link href={`http://localhost:3000/posts/${postData.id}`}>
        ←商品詳細へ戻る
      </Link>
      <table border={1}>
        <tbody>
          <tr>
            <th colSpan={3}>商品詳細</th>
          </tr>
          <tr>
            <th></th>
            <th>編集前</th>
            <th>編集後</th>
          </tr>
          <tr>
            <td>ID</td>
            <td>{postData.id}</td>
            <td>（編集できません）</td>
          </tr>
          <tr>
            <td>名前</td>
            <td>{postData.name}</td>
            <td>
              <input
                type="text"
                placeholder={postData.name}
                onChange={handleChangeEditItemName}
              />
            </td>
          </tr>
          <tr>
            <td>価格</td>
            <td>{postData.price}円</td>
            <td>
              <input
                type="text"
                placeholder={postData.price}
                onChange={handleChangeEditItemPrice}
              />
              円
            </td>
          </tr>
          <tr>
            <td>説明</td>
            <td>{postData.description}</td>
            <td>
              <input
                type="text"
                placeholder={postData.description}
                onChange={handleChangeEditItemDescription}
              />
            </td>
          </tr>
          <tr>
            <td>画像</td>
            <td>
              <Image
                width={40}
                height={40}
                src={`${postData.imageURL}`}
                alt={"商品イメージ"}
              />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>画像URL</td>
            <td>{postData.imageURL}</td>
            <td>
              <input
                type="text"
                placeholder={postData.imageURL}
                onChange={handleChangeItemImageURL}
              />
            </td>
          </tr>
          <tr>
            <td>削除フラグ</td>
            <td>{postData.deleted.toString()}</td>
            <td>（編集できません）</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          fetch(`http://localhost:3000/api/items/${postData.id}`, {
            method: "PATCH",
            body: JSON.stringify({
              name: editItemName,
              price: editItemPrice,
              description: editItemDescription,
              imageURL: editItemImageURL,
            }),
            headers: { "Content-Type": "application/json" },
          });
          alert("入力内容を編集しました");
          router.reload();
        }}
      >
        更新
      </button>
    </>
  );
};

export default EditPage;
