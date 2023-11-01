import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar';
import PaymentSummary from './components/paymentsummary';

const FeePay2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    console.log(data, '---data');
  }, [data]);

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
                <input
                  type="radio"
                  defaultValue="Credit/Debit Card"
                  name="pay"
                  onChange={() => {
                    navigate(`/feepay1`);
                  }}
                />
                <span>
                  Credit/Debit<span className="card1">Card</span>
                </span>
              </div>
              <div className="pay">
                <input type="radio" name="pay" defaultValue="upi" />
                <span>UPI</span>
              </div>
              <div className="pay">
                <input
                  type="radio"
                  name="pay"
                  defaultValue="cash"
                  onChange={() => {
                     navigate(`/feepay3`);
                  }}
                />
                <span>Cash</span>
              </div>
            </div>
            <div className="upi-content">
              <img src="images/UPI.png" />
              <p>
                Scan the QR CODE using your preferred UPI app to Complete the
                payment
              </p>
              <img src="images/QR.png" />
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
              <span>₹{data && data.dueamount}</span>
            </div>
            <div className="apply">
              {/* <input type="text" placeholder="Free concession or discount code" /> */}
              1000
              <button className="apply-btn">1000</button>
            </div>
            <div className="gst">
              <div className="gst-1">
                <span>Subtotal</span>
                <span>₹{data && data.dueamount-1000}</span>
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
              <span style={{ fontSize: 21 }}>₹{data && data.dueamount-1000 + 2.24}</span>
            </div>
          </div>
      
    </div> 
      </div>
    </div>
  );
};

export default FeePay2;
