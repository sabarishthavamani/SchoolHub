import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
//import actions
import { feesStatus } from '../../actions/adminAction';

const StudentInfo = (props) => {
  const { studentDetails, toggleStudentInfo, IMAGE_URL } = props
  //destructuring of studentDetails
  const { name, contactNumber, email, permanentaddress, photo, feesamount, studentId } = studentDetails
  //state for feestatus
  const [data, setData] = useState({});
  //getting feestatus from backend
  const getData = async () => {
    try {
      const Data = {
        studentId: studentId
      }
      console.log(Data, '---Data')
      let { status, result } = await feesStatus(Data)
      if (status == true) {
        setData(result)
      }
    } catch (err) {
      console.log(err, '--err')
    }
  }
  useEffect(() => {
    getData()
  }, [studentId])
  return (
    <>
       {data === null ?(     <div className="student-right">
        <button className='close-btn' onClick={() => toggleStudentInfo(false)}><FontAwesomeIcon icon={faXmark} /></button>
        <div className="std-personal-info" id="information">
          <div className="std-image">
            <img src={`${IMAGE_URL}/${photo}`} alt="" />
          </div>
          <div className="std-name">
            <span>{name}</span>
          </div>
          <div className="std-history">
            <div className="adrs">
              <i className="fa fa-envelope-o" />
              <span>{email}</span>
            </div>
            <div className="adrs">
              <i className="fa fa-phone" />
              <span>(+91){contactNumber}</span>
            </div>
            <div className="adrs">
              <i className="fa fa-address-card-o" />
              <span>{permanentaddress}</span>
            </div>
          </div>
          <div className="fees-history">
            <h4>Fee Status</h4>
            <div className="feeslide">
              <p>Total Fees Amount</p>
              <span className="due1">₹{feesamount}</span>
            </div>
              <>
                <div className="feeslide">
                  <p>Amount Paid</p>
                  <span className="due2">₹0.00</span>
                </div>
                <div className="feeslide">
                  <p>Balance Due Amount</p>
                  <span className="due1">₹{feesamount}</span>
                </div>
              </>
          </div>
        </div>
      </div>):(
            <div className="student-right">
            <button className='close-btn' onClick={() => toggleStudentInfo(false)}><FontAwesomeIcon icon={faXmark} /></button>
            <div className="std-personal-info" id="information">
              <div className="std-image">
                <img src={`${IMAGE_URL}/${photo}`} alt="" />
              </div>
              <div className="std-name">
                <span>{name}</span>
              </div>
              <div className="std-history">
                <div className="adrs">
                  <i className="fa fa-envelope-o" />
                  <span>{email}</span>
                </div>
                <div className="adrs">
                  <i className="fa fa-phone" />
                  <span>(+91){contactNumber}</span>
                </div>
                <div className="adrs">
                  <i className="fa fa-address-card-o" />
                  <span>{permanentaddress}</span>
                </div>
              </div>
              <div className="fees-history">
                <h4>Fee Status</h4>
                <div className="feeslide">
                  <p>Total Fees Amount</p>
                  <span className="due1">₹{feesamount}</span>
                </div>
                {data === null ? (
                  <>
                    <div className="feeslide">
                      <p>Amount Paid</p>
                      <span className="due2">₹0.00</span>
                    </div>
                    <div className="feeslide">
                      <p>Balance Due Amount</p>
                      <span className="due1">₹{feesamount}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="feeslide">
                      <p>Amount Paid</p>
                      <span className="due2">₹{data.amountpaid}</span>
                    </div>
                    <div className="feeslide">
                      <p>Balance Due Amount</p>
                      {data.balanceamount === 0 ? ( <span className="due2">₹0.00</span>):( <span className="due1">₹{data.balanceamount}</span>)}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
      )}
  
    </>
  );
}
export default StudentInfo