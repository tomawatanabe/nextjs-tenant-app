import Head from "next/head";
import Link from "next/link";
import PurchaseReception from "../components/PurchaseReception";

const ApplyForm = () => {
  return (
    <>
      <Head>
        <title>買取受付フォーム</title>
      </Head>
      <div>
        <h2>買い取りシステム</h2>
        <p>
          新品、中古、新作、旧作スニーカーを高価買取！1足から何足でもOK！
          <br />
          直接店舗に持ち込んでその場で現金！全国から発送買取も受付中です！
        </p>
      </div>
      <form>
        <legend>
          <h2>お客様情報の入力</h2>
        </legend>
        <label htmlFor="applicant-name">
          氏名<span>*必須</span>
        </label>
        <input type="text" placeholder="山田" id="applicant-name"></input>
        <input type="text" placeholder="太郎"></input>
        <br />
        <label htmlFor="applicant-kana-name">
          氏名（フリガナ）<span>*必須</span>
        </label>
        <input
          type="text"
          placeholder="ヤマダ"
          id="applicant-kana-name"
        ></input>
        <input type="text" placeholder="タロウ"></input>
        <br />
        <label htmlFor="applicant-phoneNumber">
          電話番号<span>*必須</span>
        </label>
        <input type="tel" placeholder="tel" id="applicant-phoneNumber"></input>
        <br />
        <label htmlFor="applicant-mail">
          メールアドレス<span>*必須</span>
        </label>
        <input type="mail" placeholder="" id="applicant-mail"></input>
        <br />
        <label htmlFor="applicant-postCode">
          郵便番号<span>*必須</span>
        </label>
        <input
          type="text"
          placeholder="123-4567"
          id="applicant-mail"
          pattern="\d{3}-?\d{4}"
        ></input>
        <br />
        <label htmlFor="applicant-prefecture">
          都道府県<span>*必須</span>
        </label>
        <input
          type="text"
          placeholder="東京都"
          id="applicant-prefecture"
        ></input>
        <br />
        <label htmlFor="applicant-city">
          市区町村<span>*必須</span>
        </label>
        <input type="text" placeholder="新宿区" id="applicant-city"></input>
        <br />
        <label htmlFor="applicant-address">
          番地<span>*必須</span>
        </label>
        <input
          type="text"
          placeholder="新宿4-3-25"
          id="applicant-address"
        ></input>
        <br />
        <label htmlFor="applicant-building">
          アパート・マンション名<span>*必須</span>
        </label>
        <input
          type="text"
          placeholder="TOKYU REIT新宿ビル8F"
          id="applicant-address"
        ></input>
        <legend>買取希望商品1</legend>
        <PurchaseReception />
        <legend>買取希望商品2</legend>
        <PurchaseReception />
        <br />
        <span>
          さらに買取希望の方は下記の備考欄に入力をお願い致します。
          <br />
          下記をコピーしてお使いください。
          <br /> ----------------------------
          <br />
          品名:
          <br />
          品名:
          <br />
          品番:
          <br />
          サイズ:
          <br />
          カラーetc:
          <br />
          備考:
        </span>
        <input
          type="textarea"
          placeholder="買取情報を入力してください"
          className=""
          id=""
        ></input>
        <div className="button001">
          <Link href="#">入力内容を確認する</Link>
        </div>
      </form>
    </>
  );
};

export default ApplyForm;
