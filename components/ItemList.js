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
            <tr
              key={item.id}
              id={item.id}
              style={{ display: item.deleted ? "none" : "table-row" }}
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
  );
};

export default ItemList;
