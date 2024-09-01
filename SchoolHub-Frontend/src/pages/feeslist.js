import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import component
//import actions
import { viewFees } from "../actions/adminAction";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const FeesList = () => {
  //state
  const [data, setData] = useState();
  //navigate
  const navigate = useNavigate();

  const getData = async () => {
    try {
      let { status, result } = await viewFees();
      if (status === true) {
        setData(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const editFees = (id) => {
    navigate("/fees-edit/" + id);
  };

  return (
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />

        <div className="att-sheet">
          <div className="att-record" style={{ marginTop: "65px" }}>
            <p>Fees List</p>
            <table className="sheet">
              <thead>
                <tr className="sheet-head">
                  <th>Grade</th>
                  <th>Term1</th>
                  <th>Term2</th>
                  <th>Term3</th>
                  <th>Updated Date</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((item, key) => {
                    return (
                      <tr className="sheet-body" key={key}>
                        <td>{item.admissiongrade}</td>
                        <td>₹{item.term1}</td>
                        <td>₹{item.term2}</td>
                        <td>₹{item.term3}</td>
                        <td>{item.updateddate}</td>
                        <td className="edit" id="ed">
                          <a
                            className="dropdown-item"
                            href="#"
                            style={{ color: "blue" }}
                            onClick={() => editFees(item._id)}
                          >
                            <i
                              className="fa fa-pencil"
                              style={{ color: "blue" }}
                            />
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesList;
