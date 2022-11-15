import { ChangeEvent, useState } from "react";

const Create = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImageURL, setItemImageURL] = useState("");

  const handleChangeItemName = (e: ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const handleChangeItemDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setItemDescription(e.target.value);
  };

  const handleChangeItemPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setItemPrice(e.target.value);
  };

  const handleChangeItemImageURL = (e: ChangeEvent<HTMLInputElement>) => {
    setItemImageURL(e.target.value);
  };

  //postする処理
  const postData = async () => {
    fetch("api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemName,
        description: itemDescription,
        price: Number(itemPrice),
        imageURL: itemImageURL,
        deleted:false,
      }),
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    postData();
    alert("商品を登録しました");
    e.preventDefault();
  };

  return (
    <>
      <form action="">
        <legend>＜新規登録＞</legend>
        <label htmlFor="item-name">商品名：</label>
        <input
          type="text"
          placeholder="商品名"
          id="item-name"
          value={itemName}
          onChange={handleChangeItemName}
        ></input>
        <br />
        <label htmlFor="item-description">説明文：</label>
        <input
          type="text"
          placeholder="説明"
          id="item-description"
          value={itemDescription}
          onChange={handleChangeItemDescription}
        ></input>
        <br />
        <label htmlFor="item-price">値　段：</label>
        <input
          type="text"
          placeholder="値段"
          id="item-price"
          value={itemPrice}
          onChange={handleChangeItemPrice}
        ></input>
        <br />
        <label htmlFor="item-image-url">U R L ：</label>
        <input
          type="text"
          placeholder="画像のURL"
          id="item-image-url"
          value={itemImageURL}
          onChange={handleChangeItemImageURL}
        ></input>
        <br />
        <input type="submit" value="登録" onClick={handleClick} />
      </form>
    </>
  );
};

export default Create;