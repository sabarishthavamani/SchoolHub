import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

//lib
import toastAlert from '../lib/toast';
import { viewTeacher } from '../actions/userAction';

const TeacherList = () => {
    const [data, setData] = useState();
    const [IMAGE_URL, setIMAGE_URL] = useState('');

    const getData = async () => {
        try {
            let { status, result, imageUrl } = await viewTeacher();
            if (status === true) {
                setData(result)
                setIMAGE_URL(imageUrl);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="teacher">
            <Sidebar />
            <div className="teacher-content" style={{ background: "#f7f7f8" }}>
                <div className="header">
                    <div className="l-header">
                        <p>New Teacher</p>
                    </div>
                    <div className="r-header" style={{ width: 600 }}>
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
                                    return (
                                        <tr className="tchr-row" onclick="infos()"  key={key}>
                                            <td className="profile">
                                            <a href={`${IMAGE_URL}/${item.teacherphoto}`} target="_blank">
                          <img src={`${IMAGE_URL}/${item.teacherphoto}`} alt="" /></a>
                                                <span>{item.name}</span>
                                            </td>
                                            <td>{item.teacherId}</td>
                                            <td>
                                                <span className="grade">X</span>
                                            </td>
                                            <td>
                                                <span className="grade">Bio</span>
                                            </td>
                                            <td>+91{item.phoneNumber}</td>
                                            <td>
                                                <span className="rupee">₹ 122345</span>
                                            </td>
                                            <td>
                                                <span className="due2">Paid</span>
                                            </td>
                                            <td>
                                            <div className="dropdown">
                          <FontAwesomeIcon icon={faEllipsis} className="dropdown-toggle" data-bs-toggle="dropdown" />
                          <ul className="dropdown-menu" style={{ background: "#fafafa" }}>
                            <li className="edit-box">
                              <a className="dropdown-item" href="#" style={{ color: "blue" }} >
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
                              <a className="dropdown-item" href="#" style={{ color: "red" }} >
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