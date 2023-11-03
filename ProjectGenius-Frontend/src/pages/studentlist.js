import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis,faSort } from '@fortawesome/free-solid-svg-icons';
import { viewStudent, deleteStudent } from '../actions/userAction';

//Pop up package
import 'react-alert-confirm/lib/style.css';
import AlertConfirm, { Button } from 'react-alert-confirm';

//components
import StudentInfo from './components/StudentInfo';
//lib
import toastAlert from '../lib/toast';

const Students = () => {
  const [data, setData] = useState();
  const [IMAGE_URL, setIMAGE_URL] = useState('');
  const [showStudentInfo, toggleStudentInfo] = useState(false);
  const [clickedStudentDetails, setStudentDetails] = useState({});
  const [userSearchInput, setUserSearchInput] = useState("");
  const [isAsc, setSortedData] = useState(true);
  const [sortKey, setSortKey] = useState('');

  console.log(data)

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
       
    }
  }

  const getData = async () => {
    try {
      let { status, result, imageUrl } = await viewStudent();
      if (status === true) {
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
console.log(data,'---data')
  const editstudent = (id) => {
    navigate('/student-edit/' + id)
  }

  const handleStudentInfo = (id) => {
    const studentDetails = data.find(eachItem => eachItem.studentId === id);

    if (studentDetails) {
      setStudentDetails(studentDetails)
      toggleStudentInfo(true)
    } 
  }

  const handleSearchInput = (event) => {
      setUserSearchInput(event.target.value)
  }
  
  let userSearchData = null;

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

  
  const openBasic = async (Id) => {
    const [action] = await AlertConfirm('Are you sure, you want to delete it');
    // action && console.log('ok');
    if (action) {
      deletestudent(Id)
         }
  };

  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="l-header">
            <p>Student Details</p>
          </div>
          <div className="middle-header-right">
            <input type="search" placeholder="search" onChange={handleSearchInput} value={userSearchInput}/>
            <div className="dropdown filter">
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
            </div>
          </div>
        </div>
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
                        {/* <a href={`${IMAGE_URL}/${item.photo}`} target="_blank"> */}
                          <img src={`${IMAGE_URL}/${item.photo}`} alt="" onClick={() => handleStudentInfo(item.studentId)} />
                        {/* </a> */}
                        <span key={key} onClick={() => handleStudentInfo(item.studentId)}>{item.name}</span>
                      </td>
                      <td>{item.studentId}</td>
                      <td>
                        <span className="grade">{item.admissiongrade}</span>
                      </td>
                      <td>+91{item.contactNumber}</td>
                      <td>{item.doj}</td>
                      <td>
                        <span className="due1">$9000</span>
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
                              <a className="dropdown-item" href="#" >
                                <i className="fa fa-tags" />
                                More
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
      </div>
      {showStudentInfo && <StudentInfo IMAGE_URL={IMAGE_URL} studentDetails={clickedStudentDetails} toggleStudentInfo={toggleStudentInfo} />}
    </div>
  );
};

export default Students;
