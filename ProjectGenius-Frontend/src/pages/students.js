import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPencil, faTags, faTrash } from '@fortawesome/free-solid-svg-icons';
import { viewStudent, deleteStudent } from '../actions/userAction';

//lib
import toastAlert from '../lib/toast';

const Students = () => {
  const [data, setData] = useState([]);
  const [IMAGE_URL, setIMAGE_URL] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredData, setFilteredData] = useState([])

  //navigate
  const navigate = useNavigate();
  const deletestudent = async (id) => {
    try {

      let { status, message } = await deleteStudent(id)

      if (status === true) {
        toastAlert('success', message)
        getData()

      } else if (status === false) {
        toastAlert('success', message)
      }

    } catch (err) {

    }
  }

  const getData = async () => {
    try {
      let { status, result, imageUrl } = await viewStudent();
      if (status === true) {
        setData(result)
        setFilteredData(result)
        setIMAGE_URL(imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const selectStudentInfo = (student) => {
    setSelectedStudent(student);
  };
  const editstudent = (id) => {
    navigate('/student-edit/' + id)
  }
  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };
  const renderTickIcon = (option) => {
    return selectedOption === option ? <i className="fa fa-check tik" /> : null;
  };
  const filteredResults = data.filter((item) => {
    if (!selectedOption) {
      return true; // Show all data if no option is selected
    }

    // Implement your filtering logic here based on the selected option
    // For example, if selectedOption is 'Student Name', filter by student name.
    return item.name === selectedOption;
  });

  return (
    <div className="student-container">
      <Sidebar />
      <div className="middle-content">
        <div className="middle-header">
          <div className="middle-header-left">
            <h3>Student Details</h3>
          </div>
          <div className="middle-header-right">
            <input type="search" placeholder="search" />
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
                    onClick={() => handleOptionSelection('Student Name')}
                  >
                    {renderTickIcon('Student Name')} Student Name
                  </button>
                </li>
                <li>
                <button
                    className="std-btn dropdown-item"
                    onClick={() => handleOptionSelection('Admission Date')}
                  >
                    {renderTickIcon('Admission Date')} Admission Date
                  </button>
                </li>
                <li>
                <button
                    className="std-btn dropdown-item"
                    onClick={() => handleOptionSelection('Grade')}
                  >
                    {renderTickIcon('Grade')} Grade
                  </button>
                </li>
                <li>
                <button
                    className="std-btn dropdown-item"
                    onClick={() => handleOptionSelection('Contact Number')}
                  >
                    {renderTickIcon('Contact Number')} Contact Number
                  </button>
                </li>
                <li>
                <button
                    className="std-btn dropdown-item"
                    onClick={() => handleOptionSelection('Fee Payment Due')}
                  >
                    {renderTickIcon('Fee Payment Due')} Fee Payment Due
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
              <th>Name {renderTickIcon('Student Name')}</th>
          <th>Student ID {renderTickIcon('Student ID')}</th>
          <th>Grade {renderTickIcon('Grade')}</th>
          <th>Contact Number {renderTickIcon('Contact Number')}</th>
          <th>Due Amount {renderTickIcon('Fee Payment Due')}</th>
          <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults &&
                filteredResults.length > 0 &&
                filteredResults.map((item, key) => {
                  return (
                    <tr className="std-row" >
                      <td className="profile">
                        <a href={`${IMAGE_URL}/${item.photo}`} target="_blank">
                          <img src={`${IMAGE_URL}/${item.photo}`} alt="" />
                        </a>
                        <span key={key} onClick={() => selectStudentInfo(item)}>{item.name}</span>
                      </td>
                      <td>{item.studentId}</td>
                      <td>
                        <span className="grade">{item.admissiongrade}</span>
                      </td>
                      <td>+91{item.contactNumber}</td>
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
                              <a className="dropdown-item" href="#">
                                <i className="fa fa-tags" />
                                More
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#" style={{ color: "red" }} onClick={() => deletestudent(item._id)}>
                                <i
                                  className="fa fa-trash-o"
                                  style={{ color: "red", marginRight: 10 }}
                                />
                                Clear
                              </a>
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
      </div>
      <div className="student-right">
        <div className="std-personal-info">
          {selectedStudent && (
            <div className="std-image">
              <img src={`${IMAGE_URL}/${selectedStudent.photo}`} alt="" />
            </div>
          )}
          {selectedStudent && (
            <div className="std-name">
              <span>{selectedStudent.name}</span>
            </div>
          )}
          {selectedStudent && (
            <div className="std-history">
              <div className="adrs">
                <i className="fa fa-envelope-o" />
                <span>{selectedStudent.email}</span>
              </div>
              <div className="adrs">
                <i className="fa fa-phone" />
                <span>(+91){selectedStudent.contactNumber}</span>
              </div>
              <div className="adrs">
                <i className="fa fa-address-card-o" />
                <span>{selectedStudent.permanentaddress}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
