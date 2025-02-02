import React, { useState, useRef } from "react";
import photo2 from "./assets/Group 8 (2).svg";
import photo1 from "./assets/Group 15.svg";
import arrow_image from "./assets/Path (12).svg";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [error, setError] = useState({
    nameError: "",
    cardError: "",
    expError: "",
    cvvError: "",
  });
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  function validateCardholderName(name) {
    if (name.trim() === "") {
      return "Can't be blank";
    }
    const regex = /^[a-zA-Z ]+$/;
    if (!regex.test(name)) {
      return "Letters only";
    }
    return "";
  }

  function validateCardNumber(number) {
    const numberWithoutSpaces = number.replace(/\s/g, "");
    if (numberWithoutSpaces === "") {
      return "Can't be blank";
    }
    const regex = /^\d{16}$/;
    if (!regex.test(numberWithoutSpaces)) {
      return "Wrong format, numbers only";
    }
    return "";
  }

  function validateExpirationDate(month, year) {
    if (month.trim() === "" || year.trim() === "") {
      return "Can't be blank";
    }
    const monthRegex = /^\d{2}$/;
    const yearRegex = /^\d{2}$/;
    if (!monthRegex.test(month) || !yearRegex.test(year)) {
      return "Wrong format";
    }
    return "";
  }

  function validateCvv(cvv) {
    if (cvv.trim() === "") {
      return "Can't be blank";
    }
    const regex = /^\d{3}$/;
    if (!regex.test(cvv)) {
      return "Wrong format, numbers only";
    }
    return "";
  }

  function NameChange(event) {
    setCardholderName(event.target.value);
  }

  function CardNumberChange(event) {
    const value = event.target.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(.{4})(?=.)/g, "$1 ");
    setCardNumber(value);
  }

  function ExpMonthChange(e) {
    setExpMonth(e.target.value);
  }

  function ExpYearChange(e) {
    setExpYear(e.target.value);
  }

  function CvvChange(e) {
    setCvv(e.target.value);
  }

  function validateForm() {
    const nameError = validateCardholderName(cardholderName);
    const cardError = validateCardNumber(cardNumber);
    const expError = validateExpirationDate(expMonth, expYear);
    const cvvError = validateCvv(cvv);

    setError({ nameError, cardError, expError, cvvError });

    return !nameError && !cardError && !expError && !cvvError;
  }

  function Submit(event) {
    event.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  }

  function Continue() {
    window.location.reload();
  }

  return (
    <>
      <div className="background">
        <div className="first_card">
          <div>
            <img className="photo2" src={photo2} alt="Card Logo" />
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
            <img src={photo1} alt="Card Logo Back" />
          </div>
        </div>
      </div>

      <form
        className={`form ${formSubmitted ? "form-hidden" : ""}`}
        onSubmit={Submit}
      >
        <div className="code_box">
          <div className="paragraph">CARDHOLDER NAME</div>
          <input
            className={`name ${error?.nameError ? "input-error" : ""}`}
            type="text"
            placeholder="   e.g. Jane Appleseed"
            value={cardholderName}
            onChange={NameChange}
            onBlur={() =>
              setError({
                ...error,
                nameError: validateCardholderName(cardholderName),
              })
            }
          />
          {error?.nameError && (
            <div className="error-message">{error.nameError}</div>
          )}
        </div>
        <div className="code_box">
          <div className="paragraph">CARD NUMBER</div>
          <input
            className={`name ${error?.cardError ? "input-error" : ""}`}
            type="text"
            placeholder="   e.g. 1234 5678 9123 0000"
            value={cardNumber}
            onChange={CardNumberChange}
            onBlur={() =>
              setError({ ...error, cardError: validateCardNumber(cardNumber) })
            }
          />
          {error?.cardError && (
            <div className="error-message">{error.cardError}</div>
          )}
        </div>
        <div className="params_cont">
          <div className="code_box">
            <div>EXP. DATE (MM/YY)</div>
            <div className="month_year_box">
              <input
                className={`month ${error?.expError ? "input-error" : ""}`}
                type="number"
                placeholder="   MM"
                value={expMonth}
                onChange={ExpMonthChange}
                onBlur={() =>
                  setError({
                    ...error,
                    expError: validateExpirationDate(expMonth, expYear),
                  })
                }
              />
              <input
                className={`month ${error?.expError ? "input-error" : ""}`}
                type="number"
                placeholder="   YY"
                value={expYear}
                onChange={ExpYearChange}
                onBlur={() =>
                  setError({
                    ...error,
                    expError: validateExpirationDate(expMonth, expYear),
                  })
                }
              />
            </div>
            {error?.expError && (
              <div className="error-message">{error.expError}</div>
            )}
          </div>
          <div className="code_box">
            <div>CVC</div>
            <input
              className={`cvc ${error?.cvvError ? "input-error" : ""}`}
              type="number"
              placeholder="   e.g. 123"
              value={cvv}
              onChange={CvvChange}
              onBlur={() => setError({ ...error, cvvError: validateCvv(cvv) })}
            />
            {error?.cvvError && (
              <div className="error-message">{error.cvvError}</div>
            )}
          </div>
        </div>
        <button className="confirm">CONFIRM</button>
      </form>

      <div className={`thank_box ${formSubmitted ? "thank-box-visible" : ""}`}>
        <div className="arrow_box">
          <img src={arrow_image} alt="Arrow" />
        </div>
        <div>
          <h1 className="thank_heading">THANK YOU!</h1>
          <p className="thank_paragraph">We’ve added your card details</p>
        </div>
        <button className="continue_button" onClick={Continue}>
          Continue
        </button>
      </div>
    </>
  );
}

export default App;
