import React,{useState,useEffect} from 'react'

const CashPay = (props) => {
  const {amountPayable,setAmountPayable,handleSubmit,buttonText,setButtonText,updatedDueAmount}=props
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
    handleSubmit()
}

return(
    <>
      <form action="" className="cash-form">
        <div className="paid-box" style={{ marginTop: 25 }}>
          <label>Amount Payable</label>
          <input
                className="card"
                type="Number"
                value={amountPayable} // Bind to the state variable
                onChange={handleAmountPayableChange} // Handle input changes
              />
        </div>
        <div className="paid-box">
          <label>Amount Paid</label>
          <input
                className="card"
                type="Number"
                value={amountPayable} // Bind to the state variable
                onChange={handleAmountPayableChange} // Handle input changes
              />
        </div>
        {/* <div className="paid-box">
          <label>Balance Amount:</label>
              <p>₹{amountbalance}</p>
        </div> */}
         <div class="hrs">
    <hr/>
</div>
<div class="blc" >
    <label>Balance Amount</label>
    <span class="blc-amt">₹{parseInt(updatedDueAmount + 2.24)-(amountPayable)}</span>
</div>
        <div className="confirm-btn">
        <button type="button" onClick={()=>triggerSubmitAction()}>{buttonText}</button>
        </div>
      </form>
      </>

)
}

export default CashPay;