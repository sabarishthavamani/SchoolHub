import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
//import actions
import { feesStatus } from "../../actions/adminAction";
import { IoIosCloseCircleOutline } from "react-icons/io";

const StudentInfo = (props) => {
  const { studentDetails, toggleStudentInfo, IMAGE_URL } = props;
  //destructuring of studentDetails
  const {
    name,
    contactNumber,
    email,
    permanentaddress,
    photo,
    feesamount,
    studentId,
  } = studentDetails;
  //state for feestatus
  const [data, setData] = useState({});
  //getting feestatus from backend
  const getData = async () => {
    try {
      const Data = {
        studentId: studentId,
      };
      console.log(Data, "---Data");
      let { status, result } = await feesStatus(Data);
      if (status == true) {
        setData(result);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };
  useEffect(() => {
    getData();
  }, [studentId]);
  return (
    <>
      {/* <div className="edit-mark-body">
      <div className="edit-mark-container" style={{ height: "85%" }}>
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
      </div>
    </div> */}

      <div className="edit-mark-body">
        <div className="edit-mark-container" style={{ height: "85%" }}>
          <button type="button" onClick={() => toggleStudentInfo(false)}>
            <IoIosCloseCircleOutline size={35} />
          </button>
          <div
            className="std-personal-info"
            id="information"
            style={{ maxHeight: "600px", overflowY: "scroll", margin: "auto" }}
          >
            <div className="std-name">
              <div className="std-image">
                <img src={`${IMAGE_URL}/${photo}`} alt="" />
              </div>
              <span>{name}</span>
            </div>
            <div className="std-history">
              <div className="std-name">
                <span>Personal Details</span>
              </div>
              <div className="adrs">
                <span>
                  {/* {" "} */}
                  <i className="fa fa-envelope-o" />
                  {email}
                </span>
              </div>
              <div className="adrs">
                <span>
                  <i className="fa fa-phone" />
                  (+91){contactNumber}
                </span>
              </div>
              <div className="adrs">
                <span>
                  <i className="fa fa-address-card-o" />
                  {permanentaddress}
                </span>
              </div>
            </div>
            <div>
              {/* <div style={{ color: "#ff80a6", fontWeight: 600 }}>
                Students list
              </div> */}
              <div className="adrs">
                <ul className="student-list">
                </ul>
              </div>
            </div>
            <div
              style={{}}
            >
              {/* <div style={{ color: "#ff80a6", fontWeight: 600 }}>
                Teachers list
              </div> */}
              <div className="adrs">
                <ul className="student-list">
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentInfo;
