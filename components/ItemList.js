import useSWR from "swr";
import Link from "next/link";

const fetcher = (resource) => fetch(resource).then((res) => res.json());

const ItemList = () => {
  const { data, error } = useSWR("/api/items", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <table border="solid">
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>説明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <Link href='../pages/[id]'>詳細/更新</Link>
              </td>
              <td>
                <button>削除</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ItemList;
