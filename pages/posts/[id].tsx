import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

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
      <Head>商品詳細</Head>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{postData.id}</td>
          </tr>
          <tr>
            <th>名前</th>
            <td>{postData.name}</td>
          </tr>
          <tr>
            <th>価格</th>
            <td>{postData.price}円</td>
          </tr>
          <tr>
            <th>説明</th>
            <td>{postData.description}</td>
          </tr>
          <tr>
            <th>画像URL</th>
            <td>{postData.imageURL}</td>
          </tr>
          <tr>
            <th>削除フラグ</th>
            <td>{postData.deleted.toString()}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Detail;
