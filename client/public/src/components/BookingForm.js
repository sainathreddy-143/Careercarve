// src/components/BookingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [mentors, setMentors] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [duration, setDuration] = useState(30);
    const [selectedMentor, setSelectedMentor] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/mentors')
            .then(response => setMentors(response.data))
            .catch(error => console.error('Error fetching mentors:', error));
    }, []);

    const handleBooking = () => {
        const startTime = new Date().toISOString();
        const endTime = new Date(new Date().getTime() + duration * 60000).toISOString();
        axios.post('http://localhost:5000/bookings', {
            student_id: 1, // Example student ID
            mentor_id: selectedMentor.id,
            start_time: startTime,
            end_time: endTime,
            duration: duration
        })
            .then(response => alert('Booking confirmed!'))
            .catch(error => console.error('Error creating booking:', error));
    };

    return (
        <div>
            <h1>Book a 1x1 Session</h1>
            <form>
                <label>
                    Student Name:
                    <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} />
                </label>
                <label>
                    Area of Interest:
                    <input type="text" value={areaOfInterest} onChange={e => setAreaOfInterest(e.target.value)} />
                </label>
                <label>
                    Duration:
                    <select value={duration} onChange={e => setDuration(Number(e.target.value))}>
                        <option value={30}>30 mins</option>
                        <option value={45}>45 mins</option>
                        <option value={60}>60 mins</option>
                    </select>
                </label>
                <label>
                    Mentor:
                    <select onChange={e => setSelectedMentor(mentors.find(m => m.id === Number(e.target.value)))}>
                        {mentors.map(mentor => (
                            <option key={mentor.id} value={mentor.id}>
                                {mentor.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="button" onClick={handleBooking}>Book Now</button>
            </form>
        </div>
    );
};

export default BookingForm;
