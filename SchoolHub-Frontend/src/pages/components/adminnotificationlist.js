import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminnotificationDelete,
  adminnotificationDisplay,
  newadminNotification,
} from "../../actions/adminAction";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./Adminsidebar";
import Adminnotificationfrom from "./adminnotificationfrom";
import toastAlert from "../../lib/toast";

const Adminnotificationlist = () => {
  const [data, setData] = useState([]);
  const [loaderView, setLoaderView] = useState(true);
  const [IMAGE_URL, setIMAGE_URL] = useState("");
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showcircularPopup, setshowcircularPopup] = useState(false);
  const [circularFormData, setcircularFormData] = useState({
    title: "",
    command: "",
    photo: "",
    date: "",
  });

  const handlecircularPopup = () => {
    setshowcircularPopup(true);
  };
  const closePopup = () => {
    setshowcircularPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, result, imageUrl } = await adminnotificationDisplay();
        if (status) {
          setLoaderView(false);
          setIMAGE_URL(imageUrl);
          setData(result);
        } else {
          console.log("Error fetching data:", result);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/adminnotificationUpdate/${id}`);
  };

  //Month fetching

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filterDataByMonth = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    const currentDate = new Date().getMonth() + 1;
    setSelectedMonth(currentDate.toString());
  }, []);

  const filteredData = selectedMonth
    ? data.filter(
        (item) => new Date(item.date).getMonth() + 1 === Number(selectedMonth)
      )
    : [];

  const handleFormSubmit = async (formData) => {
    try {
      const { message, status } = await newadminNotification(formData);
      if (status) {
        const { status, result, imageUrl } = await adminnotificationDisplay();
        if (status) {
          setLoaderView(false);
          setIMAGE_URL(imageUrl);
          setData(result);
        }
      } else {
        console.log("Error submitting data:", message);
      }
    } catch (error) {
      console.log("Error submitting data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { status, message, result } = await adminnotificationDelete(id);
      if (status === true) {
        toastAlert("error", message);
        setData(data.filter((item) => item._id !== id));
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };

  const renderUserView = () => {
    if (loaderView) {
      return <div className="loader-view-container">{/* Loader */}</div>;
    }

    if (!data) {
      return <div>No data available</div>;
    }
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  };

  // Pagination
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [userSearchInput, setUserSearchInput] = useState("");

  useEffect(() => {
    setFilteredDatas(data); // Initialize filteredData when data is set
  }, [data]);

  const handleSearchInput = (event) => {
    const userInput = event.target.value.toLowerCase();
    setUserSearchInput(userInput);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(userInput)
    );
    setFilteredDatas(filtered);
    setCurrentPage(1);
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
    <div className="attendance">
      <AdminHeader />
      <div className="attendance-content">
        <AdminSidebar />
        <div className="att-sheet">
          <div className="class-details">
            <div className="std-class" style={{ marginTop: "15px" }}>
              <label>className</label>
              <select
                name="Month"
                onChange={(e) => filterDataByMonth(e.target.value)}
                value={selectedMonth}
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="sheet-button"
              type="button"
              onClick={handlecircularPopup}
            >
              Generate Circular
            </button>
          </div>

          <div className="header" style={{ marginTop: "-30px" }}>
            <div className="l-header d-flex align-center">
              <p className="m-2 text-dark">Admin Circular</p>
            </div>
            {/* <div className="middle-header-right">
              <input
                type="search"
                placeholder="search"
                onChange={handleSearchInput}
                value={userSearchInput}
              />
            </div> */}
          </div>
          <div
            className="att-record"
            style={{ flex: "none", maxHeight: "500px" }}
          >
            <table className="sheet">
              <thead>
                <tr className="sheet-head">
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Announcement</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {selectedMonth && (
                <tbody>
                  {currentData.map((item, index) => (
                    <tr
                      className="sheet-body"
                      key={index + indexOfFirstItem + 1}
                    >
                      <td>{index + indexOfFirstItem + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.title}</td>
                      <td style={{ width: "50%" }}>{item.command}</td>
                      <td
                        className="profile"
                        style={{ width: "90px", height: "90px" }}
                      >
                        <img
                          src={`${IMAGE_URL}/${item.photo}`}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>
                        <span
                          className="due1"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
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
              disabled={
                currentPage === Math.ceil(filteredData.length / pageSize)
              }
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
      {showcircularPopup && (
        <div className="teacher-schedule-pop">
          <div
            className="schedule-pop-overlay"
            onClick={() => setshowcircularPopup(false)}
          >
            {" "}
          </div>
          <div className="schedule-pop-container">
            <Adminnotificationfrom
              closePopup={closePopup}
              formData={circularFormData}
              handleFormSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminnotificationlist;
