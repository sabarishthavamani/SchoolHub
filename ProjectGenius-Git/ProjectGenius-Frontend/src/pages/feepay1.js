import React from 'react'
import Sidebar from './components/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import PaymentSummary from './components/paymentsummary';


const FeePay1 = () => {
  const navigate = useNavigate();
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
            <input type="radio" defaultValue="Credit/Debit Card" name="pay" />
            <span>
              Credit/Debit<span className="card1">Card</span>
            </span>
          </div>
          <div className="pay">
            <input type="radio" name="pay" defaultValue="upi" onChange={()=>{navigate('/feepay2')}} />
            <span>UPI</span>
          </div>
          <div className="pay">
            <input type="radio" name="pay" defaultValue="cash" onChange={()=>{navigate('/feepay3')}}/>
            <span>Cash</span>
          </div>
        </div>
        <div className="pay-part">
          <label>Amount Payable</label>
          <input
            className="card"
            type="text"
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
          <button type="submit">pay $599</button>
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
   <PaymentSummary />
  </div>
</div>

    )
}
export default FeePay1;