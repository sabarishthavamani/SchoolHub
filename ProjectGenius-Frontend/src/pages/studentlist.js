import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
//fontawesome pacakage
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis,faMoneyCheck, faSort } from '@fortawesome/free-solid-svg-icons';
//react confirm pop-up package
import 'react-alert-confirm/lib/style.css';
import AlertConfirm, { Button } from 'react-alert-confirm';
//import actions 
import { viewStudent, deleteStudent } from '../actions/adminAction';
//components
import StudentInfo from './components/StudentInfo';
//lib
import toastAlert from '../lib/toast';

const Students = () => {
  const [data, setData] = useState();
  const [IMAGE_URL, setIMAGE_URL] = useState('');
  //states for student information toggle-sideviews
  const [showStudentInfo, toggleStudentInfo] = useState(false);
  const [clickedStudentDetails, setStudentDetails] = useState({});
  //states for search box and sorting
  const [userSearchInput, setUserSearchInput] = useState("");
  const [isAsc, setSortedData] = useState(true);
  const [sortKey, setSortKey] = useState('');
  //pre-loader view
  const [loaderView, setLoaderView] = useState(true)

  //preloader
 const renderUserView = () => {
    if (loaderView) {
      return(
        <div className='loader-view-container'>
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/images/Polygon 3.png`} alt="" />
            <span>Loading...</span>
          </div>
      </div>
      )
    } 
      return (
        <div className="std-table">
          <table className="std-info">
            <thead>
              <tr>
                <th>Name 
                <button type="button" className='name-sort-btn' onClick={() => handleSorting('name')}><FontAwesomeIcon icon={faSort} /></button>
                </th>
                <th>Student ID</th>
                <th>Grade</th>
                <th>Contact Number</th>
                <th>Admission Date
                <button type="button" className='name-sort-btn' onClick={() => handleSorting('doj')}><FontAwesomeIcon icon={faSort} /></button>
                </th>
                <th>Due Amount</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, key) => {
                  return (
                    <tr className="std-row" >
                      <td className="profile">
                          <img src={`${IMAGE_URL}/${item.photo}`} alt="" onClick={() => handleStudentInfo(item.studentId)} />
                        <span key={key} onClick={() => handleStudentInfo(item.studentId)}>{item.name}</span>
                      </td>
                      <td>{item.studentId}</td>
                      <td>
                        <span className="grade">{item.admissiongrade}</span>
                      </td>
                      <td>+91{item.contactNumber}</td>
                      <td>{item.doj}</td>
                      <td>
                        <span className="due1">${item.feesamount}</span>
                      </td>
                      <td className="edit" id="ed">
                        <div className="dropdown">
                          <FontAwesomeIcon icon={faEllipsis} className="dropdown-toggle" data-bs-toggle="dropdown" />
                          <ul className="dropdown-menu" style={{ background: "#fafafa" }}>
                            <li className="edit-box">
                              <a className="dropdown-item" href="#" style={{ color: "blue" }} onClick={() => editstudent(item._id)}>
                                <i className="fa fa-pencil" style={{ color: "blue" }} />
                                Edit
                              </a>
                            </li>
                            <li className="edit-box">
                              <a className="dropdown-item" href="#" onClick={() => feecollection(item._id)} style={{ color: "#13d872" }} >
                                <FontAwesomeIcon icon={faMoneyCheck} style={{ color: "#13d872", marginRight: '5px' }} />
                                Pay-Fee
                              </a>
                            </li>
                            <li>
                            <Button className='pop-up-button' onClick={() => openBasic(item._id)}>
                              <a className="dropdown-item" href="#" style={{ color: "red" }} >
                                  <i
                                    className="fa fa-trash-o"
                                    style={{ color: "red", marginRight: 10 }}
                                  />
                                  Clear
                                </a>
                            </Button>
                            </li  >
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )
  }

  //navigate
  const navigate = useNavigate();
  const deletestudent = async (id) => {
    try {
      let { status, message } = await deleteStudent(id)
      if (status === true) {
        toastAlert('success', message)
        getData()
      } else if (status === false) {
        toastAlert('error', message)
      }
    } catch (err) {
      console.log(err, '--err')
    }
  }
  //confirmation pop-up box
  const openBasic = async (Id) => {
    const [action] = await AlertConfirm('Are you sure, you want to delete it');
    // action 
    if (action) {
      deletestudent(Id)
    }
  };
  const getData = async () => {
    try {
      let { status, result, imageUrl } = await viewStudent();
      if (status === true) {
        setLoaderView(false)
        const studentData = await result.filter(each => each.active === 1 && each.name.toLowerCase().includes(userSearchInput.toLowerCase()))
        setData(studentData)
        setIMAGE_URL(imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [userSearchInput]);
  //navigate to student-edit page
  const editstudent = (id) => {
    navigate('/student-edit/' + id)
  }
  //student toggle-sideview
  const handleStudentInfo = (id) => {
    let studentDetails = data.find(eachItem => eachItem.studentId === id);
    if (studentDetails) {
      setStudentDetails(studentDetails)
      toggleStudentInfo(true)
    }
  }
  //search box function
  const handleSearchInput = (event) => {
    setUserSearchInput(event.target.value)
  }
  //name & date wise sorting function
  const sortData = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return isAsc ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  }
  const handleSorting = (key) => {
    if (sortKey === key) {
      setSortedData(!isAsc)
    } else {
      setSortKey(key)
      setSortedData(true)
    }
    sortData(key)
  }
  const feecollection = (id) => {
    navigate('/feecollection/' + id)
  }
  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Student Details</p>
          </div>
          <div className="middle-header-right">
            <input type="search" placeholder="search" onChange={handleSearchInput} value={userSearchInput} />
            {/* filter for future implementation */}
            {/* <div className="dropdown filter">
              <img className="dropdown-toggle" data-bs-toggle="dropdown"
                src="images/filter.png"
                alt=""
                title="filter"
              />
              <ul id="filter-option" className="filt-opt dropdown-menu">
                <li>
                  <button
                    className="std-btn"
                  >
                    Student Name
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  >
                    Admission Date
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  >
                    Grade
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  >
                    Contact Number
                  </button>
                </li>
                <li>
                  <button
                    className="std-btn dropdown-item"
                  > Fee Payment Due
                  </button>
                </li>
              </ul>
            </div> */}
            {/* filter for future implementation */}
          </div>
        </div>
        {renderUserView()}
      </div>
      {showStudentInfo && <StudentInfo IMAGE_URL={IMAGE_URL} studentDetails={clickedStudentDetails} toggleStudentInfo={toggleStudentInfo} />}
    </div>
  );
};

export default Students;
