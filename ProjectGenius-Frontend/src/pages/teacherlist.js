import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

//lib
import toastAlert from '../lib/toast';
import { deleteTeacher, viewTeacher } from '../actions/adminAction';

//Pop up package
import 'react-alert-confirm/lib/style.css';
import AlertConfirm, { Button } from 'react-alert-confirm';

const TeacherList = () => {
    const [data, setData] = useState();
    const [IMAGE_URL, setIMAGE_URL] = useState('');
    const [userSearchInput, setUserSearchInput] = useState("");
    const [Result, setResult] = useState();


    const navigate = useNavigate()
    const getData = async () => {
        try {
            let { status, result, imageUrl,result2 } = await viewTeacher();
            if (status === true) {
                const teacherData = await result.filter(each => each.active === 1 && each.name.toLowerCase().includes(userSearchInput.toLowerCase()))
                setData(teacherData)
                setIMAGE_URL(imageUrl);
                setResult(result2)
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getData()
    }, [userSearchInput])

    console.log(Result,'--result')

    const editteacher = (id) => {
        navigate('/teacher-edit/' + id)
    }
    const allocateteacher = (id) => {
        navigate('/teacher-allocate/' + id)
    }
    const teacherdetails = (id) => {
        navigate('/teacherdetails/' + id) 
    }
    const deleteteacher = async (id) => {
        try {

            let { status, message } = await deleteTeacher(id)

            if (status === true) {
                toastAlert('success', message)
                getData()

            } else if (status === false) {
                toastAlert('error', message)
            }

        } catch (err) {

        }
    }
    const handleSearchInput = (event) => {
        setUserSearchInput(event.target.value)
    }
    const openBasic = async (Id) => {
        const [action] = await AlertConfirm('Are you sure, you want to delete it');
        // action && console.log('ok');
        if (action) {
          deleteteacher(Id)
             }
      };
    //   const resultLookup = Result.reduce((acc, item) => {
    //     acc[item.teacherId] = item;
    //     return acc;
    //   }, {});
    return (
        <div className="teacher">
            <Sidebar />
            <div className="teacher-content" style={{ background: "#f7f7f8" }}>
                <div className="header">
                    <div className="l-header">
                        <p>Teacher List</p>
                    </div>
                    {/* <div className="r-header" style={{ width: 600 }}>
                        <input type="search" />
                        <img src="images/filter.png" />
                        <a href="#" className="notify">
                            <img
                                src="images/bell.png"
                                alt=""
                                title="notification"
                                style={{ height: 25 }}
                            />
                        </a>
                        <a href="#" className="notify">
                            <img
                                src="images/setting.png"
                                alt=""
                                title="setting"
                                style={{ height: 25 }}
                            />
                        </a>
                        <div>
                            <span>Sam Smith</span>
                            <br />
                            <span style={{ color: "#ccc" }}>Admin</span>
                        </div>
                        <img src="images/Profile photo.png" alt="" title="profile" />
                    </div> */}
                    <div className="middle-header-right">
                        <input type="search" placeholder="search" onChange={handleSearchInput} value={userSearchInput} />
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
                <div className="tchr-table" onclick="hidefilt();">
                    <table className="tchr-info">
                        <thead>
                            <tr>
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
                            {data &&
                                data.length > 0 &&
                                data.map((item, key) => {
                                    const teacherSection = Result.filter(section => section.teacherId === item.teacherId)
                                    console.log(teacherSection,'---teachersection')
                                    return (
                                        <tr className="tchr-row" onclick="infos()" key={key}>
                                            <td className="teacherprofile">
                                                    <img src={`${IMAGE_URL}/${item.teacherphoto}`} alt="" onClick={() => teacherdetails(item._id)}/>
                                                <span onClick={() => teacherdetails(item._id)}>{item.name}</span>
                                            </td>
                                            <td>{item.teacherId}</td>
                                            <td>
                                                <span className="grade">{teacherSection[0].status[0].section}</span>
                                            </td>
                                            <td>
                                                <span className="grade">{item.subjects}</span>
                                            </td>
                                            <td>+91{item.phoneNumber}</td>
                                            <td>
                                                <span className="rupee">₹122345</span>
                                            </td>
                                            <td>
                                                <span className="due2">Paid</span>
                                            </td>
                                            <td>
                                                <div className="dropdown">
                                                    <FontAwesomeIcon icon={faEllipsis} className="dropdown-toggle" data-bs-toggle="dropdown" />
                                                    <ul className="dropdown-menu" style={{ background: "#fafafa" }}>
                                                        <li className="edit-box">
                                                            <a className="dropdown-item" href="#" style={{ color: "blue" }} onClick={() => editteacher(item._id)}>
                                                                <i className="fa fa-pencil" style={{ color: "blue" }} />
                                                                Edit
                                                            </a>
                                                        </li>
                                                        <li className="edit-box">
                                                            <a className="dropdown-item" href="#" onClick={() => allocateteacher(item._id)} >
                                                                <i className="fa fa-tags" />
                                                                Allocate
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
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default TeacherList;