import ItemList from "../components/ItemList";
import Head from "next/head";
import Link from "next/link";


const Page = () => {
  return (
    <>
      <Head>
        <title>商品一覧</title>
      </Head>
      <Link href="/create">
        新規登録
      </Link>
      <ItemList />
    </>
  );
};

export default Page;
