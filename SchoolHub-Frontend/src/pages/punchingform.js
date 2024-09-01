import React, { useState } from 'react';
import axios from 'axios';
import { punchPost } from '../actions/adminAction';

const PunchingForm = () => {
    const [formData, setFormData] = useState({
        teacherId: '',
        date: '',
        name: '',
        timing:{
           inTime: '',
           outTime: ''
        }
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "inTime" || name === "outTime") {
            setFormData({
                ...formData,
                timing: { ...formData.timing, [name]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await punchPost( formData);
            setFormData({
                teacherId: '',
                date: '',
                name: '',
                inTime: '',
                outTime: ''
            });
            // Fetch updated data and display in the dashboard
            // You can use another useEffect or function to fetch and display the data
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
                placeholder="Teacher ID"
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date"
            />
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="time"
                name="inTime"
                value={formData.timing.inTime}
                onChange={handleChange}
                placeholder="In-Time"
            />
            <input
                type="time"
                name="outTime"
                value={formData.timing.outTime}
                onChange={handleChange}
                placeholder="Out-Time"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default PunchingForm;
