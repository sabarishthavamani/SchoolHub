import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
//import lib
import toastAlert from "../lib/toast";
//import Action
import { deleteTeacher, viewTeacher } from "../actions/adminAction";
//import components
import Sidebar from "./components/sidebar";
//Pop up package
import "react-alert-confirm/lib/style.css";
import AlertConfirm, { Button } from "react-alert-confirm";
import CancelIcon from "@mui/icons-material/Cancel";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/Adminsidebar";

const TeacherList = () => {
  const [data, setData] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [Result, setResult] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      let { status, result, imageUrl, result2 } = await viewTeacher();
      if (status === true) {
        setData(result);
        setIMAGE_URL(imageUrl);
        setResult(result2);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (each) =>
        each.active === 1 &&
        each.name.toLowerCase().includes(userSearchInput.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [data, userSearchInput]);

  const editTeacher = (id) => {
    navigate("/teacher-edit/" + id);
  };

  const allocateTeacher = (id) => {
    navigate("/teacher-allocate/" + id);
  };

  const teacherDetails = (id) => {
    navigate("/teacherdetails/" + id);
  };

  const deleteTeacherHandler = async (id) => {
    try {
      let { status, message } = await deleteTeacher(id);
      if (status === true) {
        toastAlert("success", message);
        getData();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchInput = (event) => {
    setUserSearchInput(event.target.value);
  };

  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    if (action) {
      deleteTeacherHandler(Id);
    }
  };

  const handlePageChange = (pageNumber) => {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="student-container">
        <div className="attendance">
          <AdminHeader />
          <div className="attendance-content">
            <AdminSidebar />
            <div className="att-sheet">
              <div className="header">
                <div className="l-header d-flex align-center">
                  <p className="m-2 text-dark">Teacher List</p>
                </div>
                <div className="middle-header-right">
                  <input
                    type="search"
                    placeholder="search"
                    onChange={handleSearchInput}
                    value={userSearchInput}
                  />
                </div>
              </div>
              <div className="att-record" style={{ flex: "none", maxHeight: "500px" }}>
                <table className="sheet">
                  <thead>
                    <tr className="sheet-head">
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Teacher ID</th>
                      <th>Grade</th>
                      <th>Subject</th>
                      <th>Contact Number</th>
                      <th>Salary Details</th>
                      <th>Salary Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData &&
                      currentData.length > 0 &&
                      currentData.map((item, index) => {
                        const matchedTeacher = Result.find(
                          (teacher) => teacher.teacherId === item.teacherId
                        );
                        const isClassTeacher =
                          matchedTeacher &&
                          matchedTeacher.status.find(
                            (status) => status.role === "Class Teacher"
                          );
                        const gradeColumn = isClassTeacher
                          ? `${isClassTeacher.className}-${isClassTeacher.section}`
                          : "-";
                        return (
                          <tr className="sheet-body" key={index + indexOfFirstItem + 1}>
                            <td>{index + indexOfFirstItem + 1}</td>
                            <td className="profile">
                              <img
                                src={`${IMAGE_URL}/${item.teacherphoto}`}
                                alt=""
                                onClick={() => teacherDetails(item._id)}
                              />
                              <span onClick={() => teacherDetails(item._id)}>
                                {item.name}
                              </span>
                            </td>
                            <td>{item.teacherId}</td>
                            <td>
                              <span className="grade">{gradeColumn}</span>
                            </td>
                            <td>
                              <span className="grade">{item.subjects}</span>
                            </td>
                            <td>+91{item.phoneNumber}</td>
                            <td>
                              <span className="rupee">{item.currentsalary}</span>
                            </td>
                            <td>
                              <span className="due2">Paid</span>
                            </td>
                            <td>
                              <div className="dropdown">
                                <FontAwesomeIcon
                                  icon={faEllipsis}
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                />
                                <ul className="dropdown-menu" style={{ background: "#fafafa" }}>
                                  <li className="edit-box">
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      style={{ color: "blue" }}
                                      onClick={() => editTeacher(item._id)}
                                    >
                                      <i className="fa fa-pencil" style={{ color: "blue" }} />
                                      Edit
                                    </a>
                                  </li>
                                  <li className="edit-box">
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() => allocateTeacher(item._id)}
                                    >
                                      <i className="fa fa-tags" />
                                      Allocate
                                    </a>
                                  </li>
                                  <li>
                                    <Button className="pop-up-button" onClick={() => openBasic(item._id)}>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        style={{ color: "red" }}
                                      >
                                        <i
                                          className="fa fa-trash-o"
                                          style={{ color: "red", marginRight: 10 }}
                                        />
                                        Clear
                                      </a>
                                    </Button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="pagination" style={{ marginBlock: "20px" }}>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#FF3672",
                    width: "90px",
                    border: "none",
                    padding: "5px 5px",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "15px",
                  }}
                >
                  Previous
                </button>
                <span className="pagination-info" style={{ marginTop: "5px" }}>
                  Page {currentPage} of {Math.ceil(filteredData.length / pageSize)}
                </span>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
                  style={{
                    marginLeft: "14px",
                    backgroundColor: "#FF3672",
                    width: "90px",
                    border: "none",
                    padding: "5px 5px",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "15px",
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherList;
