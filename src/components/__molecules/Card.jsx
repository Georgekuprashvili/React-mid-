import "../../App.css";
import photo2 from "../../assets/Group 8 (2).svg";
import photo1 from "../../assets/Group 15.svg";
import "../__molecules/card.css";
import "../responssive/responsive.css";

function Card({ cardNumber, cardholderName, expMonth, expYear, cvv }) {
  return (
    <>
      <div className="background">
        <div className="first_card">
          <div>
            <img className="photo2" src={photo2} />
          </div>
          <div className="card_number">
            {cardNumber || "0000 0000 0000 0000"}
          </div>
          <div className="name_box">
            <p className="name_p">{cardholderName || "JANE APPLESEED"}</p>
            <p className="month_p">
              {expMonth && expYear ? `${expMonth}/${expYear}` : "00/00"}
            </p>
          </div>
        </div>
        <div className="second_card">
          <div className="black_box"></div>
          <div className="cvv_box">{cvv || "000"}</div>
          <div>
            <img src={photo1} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
