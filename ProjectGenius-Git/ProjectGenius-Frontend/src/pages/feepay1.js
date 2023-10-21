import React from 'react'
import Sidebar from './components/sidebar';


const FeePay1 = () => {
    return (
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
            <input type="radio" name="pay" defaultValue="upi" />
            <span>UPI</span>
          </div>
          <div className="pay">
            <input type="radio" name="pay" defaultValue="cash" />
            <span>Cash</span>
          </div>
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
    <div className="payment-summary">
      <div className="summary-content">
        <h3>Payment Summary</h3>
        <div className="person-profile">
          <div className="pro-left">
            <img src="images/Frame 11.png" />
            <div>
              <p>October Term Fee</p>
              <p style={{ color: "#ccc", fontWeight: 400 }}>John lee</p>
            </div>
          </div>
          <span>$593.80</span>
        </div>
        <div className="apply">
          <input type="text" placeholder="Free concession or discount code" />
          <button className="apply-btn">Apply</button>
        </div>
        <div className="gst">
          <div className="gst-1">
            <span>Subtotal</span>
            <span>$593.80</span>
          </div>
          <div className="gst-2">
            <span>GST</span>
            <span>$7.24</span>
          </div>
        </div>
        <div className="total">
          <div className="tot">
            <span>Total</span>
            <p className="include">Including $2.24 in taxes</p>
          </div>
          <span style={{ fontSize: 21 }}>$599</span>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
export default FeePay1;