import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar';

const PaymentFailure = () => {
    return(
        <div className="fee-collection">
  <Sidebar />
  <div className="payment-failure">
    <div className="failure">
      <p>Oops! Something Went Wrong</p>
      <p className="fail">
        <img src="images/Vector (2).png" />
      </p>
      <h2>Payment Error</h2>
    </div>
    <Link to='/feecollection' href="#">
      Retry Payment <img src="images/blue-side.png" />
    </Link>
  </div>
</div>

    )
}

export default PaymentFailure;