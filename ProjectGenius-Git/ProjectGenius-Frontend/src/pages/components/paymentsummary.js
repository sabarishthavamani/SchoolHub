import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { feePayment } from '../../actions/userAction';

const PaymentSummary = () => {
   const {name} = useParams()
   const [data,setData] =useState({});

   const getData = async () => {
    try {
        let { status, result } = await feePayment({ name })
        if (status === true) {
            setData(result)
        }
    } catch (err) {
        console.log(err, '--err')
    }
}
useEffect(() => {
    getData(name)
}, [name])
 
console.log(data,'---data')
    return(
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
              <span>${data && data.dueamount}</span>
            </div>
            <div className="apply">
              {/* <input type="text" placeholder="Free concession or discount code" /> */}
              1000
              <button className="apply-btn">1000</button>
            </div>
            <div className="gst">
              <div className="gst-1">
                <span>Subtotal</span>
                <span>${data && data.dueamount}-1000</span>
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
      {/* <div className="summary-content">
        <h3>Payment Summary</h3>
        <div className="person-profile">
          <div className="pro-left">
            <div>
            <p>DueAmount:</p>
              <p style={{ color: "#ccc", fontWeight: 400 }}>Vetri</p>
            </div>
          </div>
          <span>$000</span>
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
      </div> */}
    </div> 
    )
}

export default PaymentSummary;