import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";
import Image from "next/image";

export const getStaticPaths: GetStaticPaths = async () => {
  //method:"GET"は省略可能
  const res = await fetch("http://localhost:3000/api/items");

  const data = await res.json();

  const paths = data.map((item: any) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  // console.log(paths);
  // =>[ { params: { id: '1' } },{ params: { id: '2' } },{ params: { id: '3' } },{ params: { id: '4' } },{ params: { id: '5' } } ]

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // console.log(params)
  // items/1に訪問した時=> { id: '1' }
  const request = await fetch(`http://localhost:3000/api/items/${params.id}`);
  const postData = await request.json();

  return {
    props: { postData },
  };
};

const Detail = ({ postData }: any): ReactElement => {
  return (
    <>
      <Head><title>商品詳細</title></Head>
      <Link href={"http://localhost:3000/"}>←商品一覧へ戻る</Link>
      <table border={1}>
        <tbody>
          <tr>
            <th colSpan={2}>商品詳細</th>
          </tr>
          <tr>
            <td>ID</td>
            <td>{postData.id}</td>
            {/* <td><input type="button"></input></td> */}
          </tr>
          <tr>
            <td>名前</td>
            <td>{postData.name}</td>
          </tr>
          <tr>
            <td>価格</td>
            <td>{postData.price}円</td>
          </tr>
          <tr>
            <td>説明</td>
            <td>{postData.description}</td>
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
          </tr>
          <tr>
            <td>画像URL</td>
            <td>{postData.imageURL}</td>
          </tr>
          <tr>
            <td>削除フラグ</td>
            <td>{postData.deleted.toString()}</td>
          </tr>
        </tbody>
      </table>
      <Link href={`http://localhost:3000/edits/${postData.id}`}>商品を編集する→</Link>
    </>
  );
};

export default Detail;
