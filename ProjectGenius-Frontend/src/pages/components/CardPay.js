import React,{useEffect} from 'react'


const CardPay = (props) => {
    const {amountPayable,setAmountPayable,buttonText,handleSubmit,setButtonText,updatedDueAmount}=props

    const handleAmountPayableChange = (e) => {
        // Update the Amount Payable state and button text when the input changes
        const newAmountPayable = parseFloat(e.target.value); // Parse as a float
        setAmountPayable(newAmountPayable);
      };
    const triggerSubmitAction = () => {
        handleSubmit()
    }
    useEffect(() => {
        // Calculate the initial button text when updatedDueAmount changes
        setButtonText(`Pay ₹${(updatedDueAmount + 2.24).toFixed(2)}`);
      }, [updatedDueAmount]);
    return (
    <>
    <form action="" className="pay-form">
    <div className="pay-part">
              <label>Amount Payable</label>
              <input
                className="card"
                type="Number"
                value={amountPayable} // Bind to the state variable
                onChange={handleAmountPayableChange} // Handle input changes
              />
            </div>
        <div className="pay-part">
        <label>Card Number</label>
        <input
            className="card"
            type="text"
            placeholder="1234 5678 9101 1121"
        />
        </div>
        <div className="exp-cv">
        <div className="pay-box">
            <label>Expiration Date</label>
            <input type="date" />
        </div>
        <div className="pay-box">
            <label>CV</label>
            <input type="text" placeholder={123} />
        </div>
        </div>
        <div className="save">
        <input type="checkbox" name="save" defaultValue="save" />
        <span>Save card details</span>
        </div>
        <div className="pay-button">
                     <button type="button" onClick={()=>triggerSubmitAction()}>{buttonText}</button>
        </div>
        <div className="pay-details">
        <p>
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
        </p>
        </div>
    </form>
    </>
    )
}
export default CardPay;