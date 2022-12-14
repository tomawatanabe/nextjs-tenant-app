import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const fetcher = (resource) => fetch(resource).then((res) => res.json());

const FalseButton = () => {
  const { data, error } = useSWR("/api/items", fetcher);
  const router = useRouter();

  return (
    <>
      <br />
      <button
        onClick={() => {
          data.map((item) => {
            fetch(`${process.env.NEXT_PUBLIC_API}/API/items/${item.id}`, {
              method: "PATCH",
              body: JSON.stringify({ deleted: false }),
              headers: { "Content-Type": "application/json" },
            });
          });

          router.reload();
        }}
      >
        （検証用ボタン）削除フラグを全てfalseに更新
      </button>
    </>
  );
};

const ItemList = () => {
  const { data, error } = useSWR("/api/items?deleted=false", fetcher);
  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>商品一覧</title>
      </Head>
      <FalseButton />
      <br />
      <table border="solid">
        <thead>
          <tr>
            <th>ID</th>
            <th>商品名</th>
            <th>説明</th>
            <th colSpan={2}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr
                key={item.id}
                id={item.id}
                //useSWRの第一引数の時点でdeleted=falseのものだけfetchしているから不要
                // style={{ display: item.deleted ? "none" : "table-row" }}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Link href={`../posts/${item.id}`}>詳細/更新</Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      fetch(`http://localhost:3000/api/items/${item.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ deleted: true }),
                        headers: { "Content-Type": "application/json" },
                      });
                      router.reload();
                    }}
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ItemList;
