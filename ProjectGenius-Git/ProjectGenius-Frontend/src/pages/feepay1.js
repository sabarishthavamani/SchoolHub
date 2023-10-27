import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import PaymentSummary from './components/paymentsummary';

const FeePay1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const [feeConcession, setFeeConcession] = useState(0);
  const [updatedDueAmount, setUpdatedDueAmount] = useState(data.dueamount);
  const [amountPayable, setAmountPayable] = useState(0); // State for Amount Payable
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    // Calculate the initial button text when updatedDueAmount changes
    setButtonText(`Pay ₹${(updatedDueAmount + 2.24).toFixed(2)}`);
  }, [updatedDueAmount]);

  useEffect(() => {
    console.log(data, '---data');
  }, [data]);

  const handleApply = () => {
    // Subtract the fee concession amount from the dueamount and update the state
    setUpdatedDueAmount(updatedDueAmount - feeConcession);
  };

  const handleAmountPayableChange = (e) => {
    // Update the Amount Payable state and button text when the input changes
    const newAmountPayable = parseFloat(e.target.value); // Parse as a float
    setAmountPayable(newAmountPayable);
  };

  useEffect(() => {
    // Calculate the button text when amountPayable changes
    setButtonText(`Pay ₹${(amountPayable + 2.24).toFixed(2)}`);
  }, [amountPayable]);
  
  return (
    <div className="fee-collection">
      <Sidebar />
      <div className="payment-content">
        <div className="payment">
          <form action="" className="pay-form">
            <h3>Payment</h3>
            <label style={{ paddingTop: 25 }}>Pay With:</label>
  <div className="paywith">
    <div className="pay">
      <input type="radio" selected />
      <span>
        Credit/Debit<span className="card1">Card</span>
      </span>
    </div>
    <div className="pay">
      <input type="radio"  />
      <span>UPI</span>
    </div>
    <div className="pay">
      <input type="radio" />
      <span>Cash</span>
    </div>
  </div>
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
    <input className="card" type="text" placeholder="1234 5678 9101 1121" />
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
              <button type="button">{buttonText}</button>
            </div>
            <div className="pay-details">
              <p>
                Your personal data will be used to process your order, support your
                experience throughout this website, and for other purposes described
                in our privacy policy.
              </p>
            </div>
          </form>
        </div>
        <div className="payment-summary">
          <div className="summary-content">
            <h3>Payment Summary</h3>
            <div className="person-profile">
              <div className="pro-left">
                <div>
                  <p>DueAmount:</p>
                  <p style={{ color: "#ccc", fontWeight: 400 }}>{data && data.name}</p>
                </div>
              </div>
              <span>₹{data.dueamount}</span>
            </div>
            <div className="apply">
              <input
                type="Number"
                placeholder="Free concession or discount code"
                value={feeConcession}
                onChange={(e) => setFeeConcession(parseFloat(e.target.value))} // Parse as a float
              />
              <button className="apply-btn" onClick={handleApply}>
                Apply
              </button>
            </div>
            <div className="gst">
              <div className="gst-1">
                <span>Subtotal</span>
                <span>₹{updatedDueAmount.toFixed(2)} {/* Format to 2 decimal places */}</span>
              </div>
              <div className="gst-2">
                <span>GST</span>
                <span>₹2.24</span>
              </div>
            </div>
            <div className="total">
              <div className="tot">
                <span>Total</span>
                <p className="include">Including ₹2.24 in taxes</p>
              </div>
              <span style={{ fontSize: 21 }}>
                ₹{(updatedDueAmount + 2.24).toFixed(2)} {/* Format to 2 decimal places */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePay1;
