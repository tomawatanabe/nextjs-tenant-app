const PurchaseRecepction = () => {
  return (
    <>
      <label htmlFor="applicant-address">
        品名<span>*必須</span>
      </label>
      <input type="text" placeholder="NIKE AIR JORDAN 1" id=""></input>
      <br />
      <label htmlFor="">
        品番<span>*必須</span>
      </label>
      <input type="text" placeholder="555088-101" id=""></input>
      <br />
      <label htmlFor="">
        サイズ<span>*必須</span>
      </label>
      <input type="text" placeholder="27cm" id=""></input>
      <br />
      <label htmlFor="">
        カラー<span>*必須</span>
      </label>
      <input type="text" placeholder="白" id=""></input>
      <br />
      <label htmlFor="">
        写真<span>*必須</span>
      </label>
      <input type="file" id=""></input>
      <br />
      <label htmlFor="">備考</label>
      <input type="textarea" placeholder="傷あり　箱無し" id=""></input>
    </>
  );
};

export default PurchaseRecepction;
