import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import PaymentSummary from './components/paymentsummary';

const FeePay3 = () => {
  const navigate = useNavigate()
return(
<div className="fee-collection">
  {/* <div className="fee-side-bar">
    <div className="fee-part-one">
      <div className="logo-content">
        <div className="logo">
          <img src="images/Polygon 3.png" />
          <span>
            <h2>Genius</h2>
          </span>
        </div>
      </div>
      <ul>
        <li>
          <div className="menu-bar">
            <img src="images/grey-file.png" />
            New Admission
          </div>
        </li>
        <li>
          <div className="menu-bar">
            <a href="students.html">
              <img
                src="images/person.png"
                alt=""
                style={{ paddingRight: 15 }}
              />
              Students
            </a>
          </div>
        </li>
        <li>
          <div className="menu-bar" style={{ color: "#905ef0" }}>
            <img src="images/blue-fee.png" alt="" />
            Fee Collection
          </div>
        </li>
        <li>
          <div className="menu-bar">
            <img src="images/setup.png" alt="" />
            Fee Setup
          </div>
        </li>
      </ul>
    </div>
    <div className="fee-part-two">
      <img src="images/Profile photo.png" alt="" />
      <div>
        <span>Sam Smith</span>
        <br />
        <span style={{ color: "#ccc" }}>Admin</span>
      </div>
      <i className="fa fa-sign-out" />
    </div>
  </div> */}
  <Sidebar />
  <div className="payment-content">
    <div className="payment">
      <form action="" className="cash-form">
        <h3>Payment</h3>
        <label style={{ paddingTop: 25 }}>Pay With:</label>
        <div className="paywith">
          <div className="pay">
            <input type="radio" name="pay"  onChange={()=>{navigate('/feepay1')}} />
            <span>
              Credit/Debit<span className="card1">Card</span>
            </span>
          </div>
          <div className="pay">
            <input type="radio" name="pay"  onChange={()=>{navigate('/feepay2')}}/>
            <span>UPI</span>
          </div>
          <div className="pay">
            <input type="radio" name="pay"  />
            <span>Cash</span>
          </div>
        </div>
        <div className="paid-box" style={{ marginTop: 25 }}>
          <label>Amount Payable</label>
          <input type="text" />
        </div>
        <div className="paid-box">
          <label>Amount Paid</label>
          <input type="text" />
        </div>
        <div className="paid-box">
          <label>Balance Amount</label>
          <input type="text" />
        </div>
        <div className="confirm-btn">
          <button>Confirm</button>
        </div>
      </form>
    </div>
  <PaymentSummary />
  </div>
</div>

)
}

export default FeePay3;