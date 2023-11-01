import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHistory, faUpload } from '@fortawesome/free-solid-svg-icons';

const TeacherHistory = (props) => {
    const { formValue, setFormValue, handlePreClick, handleSubmit, errors } = props

    const triggerPreviousForm = () => {
        handlePreClick()
    }

    const triggerSubmitAction = () => {
        handleSubmit()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormValue({ ...formValue, ...{ [name]: files[0] } })
    }

    const displayFile = (file) => {
        if (file) {
            const url = URL.createObjectURL(file);
            if (file.type.startsWith("image/")) {
                return <img src={url} style={{ width: "70px" }} alt="Uploaded File" />;
            } else if (file.type === "application/pdf") {
                return <embed src={url} type="application/pdf" width="70px" height="70px" />;
            }
        }
        return null;
    };

    const { subjects, higherqualification, teachingexperience, bloodgroup, vaccination, emergencycontactNumber, teachersignature, teachingcertificates } = formValue;

    const isButtonDisable = (teachingcertificates !== "" && subjects !== "" && higherqualification !== "" && teachingexperience !== "" && bloodgroup !== "" && vaccination !== "" && emergencycontactNumber !== "" && teachersignature !== "");

    return (
        <>
            <div className="teacher-details" style={{ minHeight: 420 }}>
                <div className="teacher-header">
                    <ion-icon name="person" />
                    <span>Teacher History</span>
                </div>
                <form action="" className="teacher-form">
                    <div className="form-left">
                        <div className="teach-box">
                            <label htmlFor="">
                                Educational Qualifications(Highest Degree)<sup>*</sup>
                            </label>
                            <select name="higherqualification" value={higherqualification} onChange={handleChange}>
                                <option></option>
                                <option>High School Diploma</option>
                                <option>Associate's Degree</option>
                                <option>Bachelor's Degree</option>
                                <option>Bachelor's Degree in Education</option>
                                <option>Master's Degree</option>
                                <option>Master's Degree in Education</option>
                                <option>Doctorate (Ph.D.) in Education</option>
                                <option>Teaching Certificate</option>
                                <option>Postgraduate Certificate in Education</option>
                                <option>Other</option>
                            </select>
                            {errors.higherqualification !== "" && <span className='text-error'>{errors.higherqualification}</span>}
                        </div>
                        <div className="teach-box">
                            <label htmlFor="">
                                Previous Teaching Experience (in Years)<sup>*</sup>
                            </label>
                            <input type="text" name="teachingexperience" value={teachingexperience} onChange={handleChange} />
                            {errors.teachingexperience !== "" && <span className='text-error'>{errors.teachingexperience}</span>}
                        </div>
                        <div className="teach-box">
                            <label htmlFor="">
                                Subject(s) Taught<sup>*</sup>
                            </label>
                            <input type="text" name="subjects" value={subjects} onChange={handleChange} />
                            {errors.subjects !== "" && <span className='text-error'>{errors.subjects}</span>}
                        </div>
                        <div className="teach-box">
                            <label htmlFor="">
                                Teaching Certifications(if any)<sup>*</sup>
                            </label>
                            <input type="text" name="teachingcertificates" value={teachingcertificates} onChange={handleChange} />
                            {errors.teachingcertificates !== "" && <span className='text-error'>{errors.teachingcertificates}</span>}
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="teach-box">
                            <label htmlFor="">
                                Blood Group<sup>*</sup>
                            </label>
                            <select name="bloodgroup" value={bloodgroup} onChange={handleChange}>
                                <option />
                                <option>A+ve</option>
                                <option>A-ve</option>
                                <option>B+ve</option>
                                <option>B-ve</option>
                                <option>AB+ve</option>
                                <option>AB-ve</option>
                                <option>O+ve</option>
                                <option>O-ve</option>
                                <option>A1B+</option>
                                <option>A1B-</option>
                                <option>A2B+</option>
                                <option>A2B-</option>
                                <option>Bombay Blood Group</option>
                            </select>
                            {errors.bloodgroup !== "" && <span className='text-error'>{errors.bloodgroup}</span>}
                        </div>
                        <div className="teach-box">
                            <label htmlFor="">
                                Vaccination Details<sup>*</sup>
                            </label>
                            <input type="text" name="vaccination" value={vaccination} onChange={handleChange} />
                            {errors.vaccination !== "" && <span className='text-error'>{errors.vaccination}</span>}
                        </div>
                        <div className="teach-box">
                            <label htmlFor="">
                                Emergency Contact Number<sup>*</sup>
                            </label>
                            <input type="text" name="emergencycontactNumber" value={emergencycontactNumber} onChange={handleChange} />
                            {errors.emergencycontactNumber !== "" && <span className='text-error'>{errors.emergencycontactNumber}</span>}
                        </div>
                        <div className="teach-box">
                            <label>
                                Digital Signature<sup>*</sup>
                            </label>
                            <input type="file" id="file" name="teachersignature" onChange={handleFileChange} accept="image/*,application/pdf" />
                            <label htmlFor="file" className="t-photo">
                                <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faUpload} /></div>
                                {teachersignature ? (<span>{teachersignature.name}</span>) : <span>Drag and Drop or Browse Files</span>}
                            </label>
                            {displayFile(teachersignature)}
                            {errors.teachersignature !== "" && <span className='text-error'>{errors.teachersignature}</span>}
                        </div>
                    </div>
                </form>
            </div>
            <div className="btnn">
                <button
                    className='previous'
                    onClick={triggerPreviousForm}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className='myarrow' />
                    Previous
                </button>
                <button type="button" onClick={triggerSubmitAction}
                    disabled={!isButtonDisable}
                    style={{ backgroundColor: isButtonDisable ? '#ff80a6' : 'gray' }}
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default TeacherHistory;