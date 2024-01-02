import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AlertConfirm from "react-alert-confirm";

const EditMarkPopUp = ({ studentDetail, handleCancelEdit, handleUpdateMark }) => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { name, studentId, subjects } = studentData;

  useEffect(() => {
    setStudentData(studentDetail);
    setLoading(false);

    return () => {
      setStudentData({});
    };
  }, [studentDetail]);

  const handleInputChange = (subject, value) => {
    setStudentData((prevData) => ({
      ...prevData,
      subjects: {
        ...prevData.subjects,
        [subject]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAnySubjectEmpty =
      !subjects.subject1 ||
      !subjects.subject2 ||
      !subjects.subject3 ||
      !subjects.subject4 ||
      !subjects.subject5;
    if (isAnySubjectEmpty) {
      setError(true);
      return;
    }
    setError(false);
    const [action] = await AlertConfirm("Click OK to update your changes");
    if (action) {
        handleUpdateMark(studentData)
    }
  };

  if (loading) {
    return (
      <div className="edit-mark-body">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-mark-body">
      <div className="edit-mark-container">
        <button type="button" onClick={() => handleCancelEdit()}>
          <IoIosCloseCircleOutline size={25} />
        </button>
        <p>
          Student ID: <span>{studentId}</span>
        </p>
        <p>
          Student Name: <span>{name}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="edit-mark-input">
            <label htmlFor="subject1">Subject 1</label>
            <input
              id="subject1"
              type="number"
              value={subjects.subject1}
              onChange={(e) => handleInputChange("subject1", e.target.value)}
            />
          </div>
          <div className="edit-mark-input">
            <label htmlFor="subject2">Subject 2</label>
            <input
              id="subject2"
              type="number"
              value={subjects.subject2}
              onChange={(e) => handleInputChange("subject2", e.target.value)}
            />
          </div>
          <div className="edit-mark-input">
            <label htmlFor="subject3">Subject 3</label>
            <input
              id="subject3"
              type="number"
              value={subjects.subject3}
              onChange={(e) => handleInputChange("subject3", e.target.value)}
            />
          </div>
          <div className="edit-mark-input">
            <label htmlFor="subject4">Subject 4</label>
            <input
              id="subject4"
              type="number"
              value={subjects.subject4}
              onChange={(e) => handleInputChange("subject4", e.target.value)}
            />
          </div>
          <div className="edit-mark-input">
            <label htmlFor="subject5">Subject 5</label>
            <input
              id="subject5"
              type="number"
              value={subjects.subject5}
              onChange={(e) => handleInputChange("subject5", e.target.value)}
            />
          </div>
          {error && <p>*Fill all the field</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditMarkPopUp;
