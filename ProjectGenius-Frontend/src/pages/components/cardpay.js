import React, { useEffect } from "react";

const CardPay = (props) => {
  const {
    amountPayable,
    setAmountPayable,
    buttonText,
    handleSubmit,
    setButtonText,
    updatedDueAmount,
  } = props;

  const handleAmountPayableChange = (e) => {
    // Update the Amount Payable state and button text when the input changes
    const newAmountPayable = parseFloat(e.target.value); // Parse as a float
    setAmountPayable(newAmountPayable);
  };
  const triggerSubmitAction = () => {
    handleSubmit();
  };
  useEffect(() => {
    // Calculate the initial button text when updatedDueAmount changes
    setButtonText(`Pay ₹${(updatedDueAmount + 2.24).toFixed(2)}`);
  }, [updatedDueAmount]);
  return (
    <>
      <div
        className="class-details"
        style={{ width: "85%", borderRadius: "15px" }}
      >
        <form className="myform" action="" style={{ marginTop: "35px" }}>
          <div className="field-box">
            <label>Amount Payable</label>
            <input
              className="card"
              type="Number"
              value={amountPayable} // Bind to the state variable
              onChange={handleAmountPayableChange} // Handle input changes
            />
          </div>

          <div className="field-box">
            <label>Card Number</label>
            <input
              className="card"
              type="text"
              placeholder="1234 5678 9101 1121"
            />
          </div>
          <div className="field-box">
            <label>Expiration Date</label>
            <input type="date" />
          </div>

          <div className="field-box">
            <label>CV</label>
            <input type="text" placeholder={123} />
          </div>
          {/* <div className="field-box">
        <input type="checkbox" name="save" defaultValue="save" />
        <span>Save card details</span>
        </div> */}
        </form>
      </div>
      <p>
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </p>
      <div className="sub-btnn">
        <div className="sub-btnn button">
          <button type="button" onClick={() => triggerSubmitAction()}>
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};
export default CardPay;
