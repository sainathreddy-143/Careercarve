// src/components/MentorList.js
import React from 'react';

const MentorList = ({ mentors }) => (
    <div>
        <h2>Available Mentors</h2>
        <ul>
            {mentors.map(mentor => (
                <li key={mentor.id}>
                    {mentor.name} - {mentor.areas_of_expertise}
                </li>
            ))}
        </ul>
    </div>
);

export default MentorList;
