import React, { useEffect, useNavigate, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faSchool,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import AlertConfirm, { Button } from "react-alert-confirm";
import { deleteHomeWork, deleteMeeting, viewMeeting } from "../../actions/teacherAction";
import toastAlert from "../../lib/toast";
import { FaFilePdf } from "react-icons/fa";

const MeetingPreview = (props) => {
  const { meetingList, getIndividualData } = props;
  const [IMAGE_URL, setIMAGE_URL] = useState("");

  console.log(meetingList, "getmeetinglist...");

  const homeworkDelete = async (Id) => {
    try {
      let { status, message } = await deleteMeeting(Id);
      if (status === true) {
        toastAlert("success", message);
        getIndividualData();
      } else if (status === false) {
        toastAlert("error", message);
      }
    } catch (err) {
      console.log(err, "--err");
    }
  };

  const getData = async () => {
    const meeting = await viewMeeting();
    const meetingFile = meeting.imageUrl;
    setIMAGE_URL(meetingFile);
    console.log(meetingFile, "meetingFile...");
  };

  useEffect(() => {
    getIndividualData();
    getData();
  }, []);

  const openBasic = async (Id) => {
    const [action] = await AlertConfirm("Are you sure, you want to delete it");
    // action
    if (action) {
      homeworkDelete(Id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Change the locale as per your requirement
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return (
    <div
      className="fee-collection"
      style={{ maxHeight: "200px", overflowY: "scroll" }}
    >
        <div className="att-record">
            <p>Attendance Sheet</p>
            <table className="sheet">
              <thead>
                <tr className="sheet-head">
              <th>S.No</th>
              <th>Class</th>
              <th>Student</th>
              <th>Decription</th>
              <th>Assigned Date</th>
              <th>File</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {meetingList &&
              meetingList.length > 0 &&
              meetingList
                .filter((item) => {
                  const assignDate = new Date(item.assignDate);
                  return (
                    assignDate.getDate() === currentDate.getDate() &&
                    assignDate.getMonth() === currentMonth &&
                    assignDate.getFullYear() === currentYear 
                  );
                })
                .map((item, key) => (
                  <tr className="std-row" key={key}>
                    <td>{key + 1}</td>
                    {/* {item.map((item, idx) => ( */}
                    <React.Fragment>
                      <td>{item.className}</td>
                      <td>{item.studentName}</td>
                      <td>{item.description}</td>
                      <td>{formatDate(item.assignDate)}</td>
                      <td className="teacherprofile" style={{ width: "100px" }}>
                        {item.fileUploads ? (
                          <>
                            {item.fileUploads.endsWith("pdf") ? (
                              <>
                                <FaFilePdf size={24} />
                                <span style={{ marginLeft: "7px" }}></span>
                                <a
                                  target="_blank"
                                  href={`${IMAGE_URL}/${item.fileUploads}`}
                                >
                                  View
                                </a>
                              </>
                            ) : (
                              <>
                                <img
                                  src={`${IMAGE_URL}/${item.fileUploads}`}
                                  alt=""
                                />
                                <a
                                  target="_blank"
                                  href={`${IMAGE_URL}/${item.fileUploads}`}
                                >
                                  View
                                </a>
                              </>
                            )}
                          </>
                        ) : (
                          <p>
                            <span>No files uploaded</span>
                          </p>
                        )}
                      </td>
                    </React.Fragment>
                    {/* ))} */}
                    <td>
                      <div>
                        <Button
                          onClick={() => openBasic(item._id)}
                          className="pop-up-button"
                        >
                          <a
                            className="dropdown-item"
                            href="#"
                            style={{ color: "red" }}
                          >
                            <i
                              className="fa fa-trash-o"
                              style={{ color: "red", marginRight: 10 }}
                            />
                          </a>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingPreview;
