import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const PaymentSummary = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [feeConcession, setFeeConcession] = useState(0);
  const [updatedDueAmount, setUpdatedDueAmount] = useState(data.dueamount);

  useEffect(() => {
    console.log(data, '---data');
  }, [data]);

  const handleApply = () => {
    // Subtract the fee concession amount from the dueamount and update the state
    setUpdatedDueAmount(updatedDueAmount - feeConcession);
  };

  return (
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
            type="text"
            placeholder="Free concession or discount code"
            value={feeConcession}
            onChange={(e) => setFeeConcession(parseFloat(e.target.value))}
          />
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
        <div className="gst">
          <div className="gst-1">
            <span>Subtotal</span>
            <span>₹{updatedDueAmount}</span>
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
            ₹{updatedDueAmount + 2.24}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
