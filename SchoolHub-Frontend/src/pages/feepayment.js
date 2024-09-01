import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
//import action
import { feesPaid } from "../actions/adminAction";
//import lib
import toastAlert from "../lib/toast";
//import components
import CardPay from "./components/cardpay";
import UpiPay from "./components/upipay";
import CashPay from "./components/cashpay";
import AdminSidebar from "./components/Adminsidebar";
import AdminHeader from "./components/AdminHeader";

const FeePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const [feeConcession, setFeeConcession] = useState(0);
  //state for subtotal amount
  const [updatedDueAmount, setUpdatedDueAmount] = useState(data.dueamount);
  // State for Amount Payable
  const [amountPayable, setAmountPayable] = useState(0);
  const [buttonText, setButtonText] = useState("");
  const [activeTab, setActiveTab] = useState("cardTab");

  useEffect(() => {
    // Calculate the initial button text when updatedDueAmount changes
    setButtonText(`Pay ₹${(updatedDueAmount + 2.24).toFixed(2)}`);
  }, [updatedDueAmount]);

  useEffect(() => {
    console.log(data, "---data");
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
  //body inputs
  const dueAmount = data.dueamount;
  const Name = data.name;
  const StudenId = data.studentId;
  const total = updatedDueAmount + 2.24;
  const amountpaid = (amountPayable + 2.24).toFixed(2);
  const isButtonDisable = feeConcession > 0;
  const handleSubmit = async () => {
    try {
      let data = {
        name: Name,
        studentId: StudenId,
        dueamount: dueAmount,
        total: total,
        amountpaid: amountpaid,
      };
      let { status, message } = await feesPaid(data);
      if (status === true) {
        toastAlert("success", message);
        navigate("/feecomplete");
      } else if (status === false) {
        if (message) {
          toastAlert("error", message);
        }
      }
    } catch (err) {
      console.log(err, "...err");
      navigate("/paymentfailure");
    }
  };
  const handleTab = (event) => {
    setActiveTab(event.target.value);
  };

  const renderPaymentForm = () => {
    switch (activeTab) {
      case "cardTab":
        return (
          <CardPay
            updatedDueAmount={updatedDueAmount}
            setButtonText={setButtonText}
            amountPayable={amountPayable}
            setAmountPayable={setAmountPayable}
            handleAmountPayableChange={handleAmountPayableChange}
            buttonText={buttonText}
            handleSubmit={handleSubmit}
          />
        );
      case "upiTab":
        return <UpiPay />;
      case "cashTab":
        return (
          <CashPay
            updatedDueAmount={updatedDueAmount}
            amountPayable={amountPayable}
            setButtonText={setButtonText}
            setAmountPayable={setAmountPayable}
            handleAmountPayableChange={handleAmountPayableChange}
            buttonText={buttonText}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />
        <div className="att-sheet">
          <h3>Payment</h3>
          <div
            className="class-details"
            style={{ width: "85%", borderRadius: "15px" }}
          >
            {" "}
            <div className="pay">
              <input
                type="radio"
                id="Credit/Debit"
                value="cardTab"
                name="pay"
                onChange={handleTab}
                checked={activeTab === "cardTab"}
              />
              <label htmlFor="Credit/Debit">
                Credit/Debit<span className="card1">Card</span>
              </label>
            </div>
            <div className="pay">
              <input
                type="radio"
                id="upi"
                name="pay"
                value="upiTab"
                onChange={handleTab}
                checked={activeTab === "upiTab"}
              />
              <label htmlFor="upi">UPI</label>
            </div>
            <div className="pay">
              <input
                type="radio"
                id="cash"
                name="pay"
                value="cashTab"
                onChange={handleTab}
                checked={activeTab === "cashTab"}
              />
              <label htmlFor="cash">Cash</label>
            </div>
          </div>
          {renderPaymentForm()}

          {/* <div className="payment-summary">
            <div className="summary-content">
              <h3>Payment Summary</h3>
              <div className="person-profile">
                <div className="pro-left">
                  <div>
                    <p>DueAmount:</p>
                    <p style={{ color: "#ccc", fontWeight: 400 }}>
                      {data && data.name}
                    </p>
                  </div>
                </div>
                <span>₹{data.dueamount}</span>
              </div>
              <div className="apply">
                <input
                  type="Number"
                  placeholder="Free concession or discount code"
                  value={feeConcession}
                  onChange={(e) => setFeeConcession(parseFloat(e.target.value))}
                />
                <button
                  className="apply-btn"
                  onClick={handleApply}
                  disabled={!isButtonDisable}
                  style={{
                    backgroundColor: isButtonDisable ? "#ff80a6" : "gray",
                  }}
                >
                  Apply
                </button>
              </div>
              <div className="gst">
                <div className="gst-1">
                  <span>Subtotal</span>
                  <span>₹{updatedDueAmount.toFixed(2)} </span>
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
                  ₹{(updatedDueAmount + 2.24).toFixed(2)}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default FeePayment;
