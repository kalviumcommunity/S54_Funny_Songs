// Profile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user data from the backend API
        axios.get('/api/users')
        .then(response => {
            setUsers(response.data); // Set the fetched user data to state
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    return (
        <div>
        <h1>User Profiles</h1>
        <ul>
            {users.map(user => (
            <li key={user._id}>
                <div>First Name: {user.FirstName}</div>
                <div>Last Name: {user.LastName}</div>
                <div>Email: {user.EmailAddress}</div>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default Profile;
