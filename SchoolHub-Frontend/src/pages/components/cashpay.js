import React, { useState, useEffect } from "react";

const CashPay = (props) => {
  const {
    amountPayable,
    setAmountPayable,
    handleSubmit,
    buttonText,
    setButtonText,
    updatedDueAmount,
  } = props;
  const handleAmountPayableChange = (e) => {
    const newAmountPayable = parseFloat(e.target.value);
    setAmountPayable(newAmountPayable);
  };
  useEffect(() => {
    // Calculate the initial button text when updatedDueAmount changes
    setButtonText(`Pay ₹${(updatedDueAmount + 2.24).toFixed(2)}`);
  }, [updatedDueAmount]);
  useEffect(() => {
    // Calculate the button text when amountPayable changes
    setButtonText(`Pay ₹${(amountPayable + 2.24).toFixed(2)}`);
  }, [amountPayable]);
  const triggerSubmitAction = () => {
    handleSubmit();
  };

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
              value={amountPayable} 
              onChange={handleAmountPayableChange} 
            />
          </div>

          <div className="field-box">
            <label>Amount Paid</label>
            <input
              className="card"
              type="Number"
              value={amountPayable} 
              onChange={handleAmountPayableChange} 
            />
          </div>
          <div className="field-box">
            <label>Balance Amount</label>
            <div className="blc-amt">
              ₹{(updatedDueAmount + 2.24 - amountPayable).toFixed(2)}
            </div>
          </div>

         
        </form>
      </div>
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

export default CashPay;
