import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainComponent.css";
import NavBar from '../NavbarComponent/NavBar';
import Footer from '../FooterComponent/Footer';

const MainComponent = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API 
        axios.get('https://s54-funny-songs.onrender.com/songs')
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }, []);

    const handleUpdate = async (id) => {
        // Assuming you have state variables to handle input fields for updating Artist, Release, and Category
        const updatedData = {
            Artist: updatedArtist,
            Release: updatedRelease,
            Category: updatedCategory
        };
    
        try {
            const response = await axios.put(`https://s54-funny-songs.onrender.com/songs/${id}`, updatedData);
            // Assuming you want to update the UI after successful update
            const updatedSongIndex = songs.findIndex(song => song._id === id);
            const updatedSongs = [...songs];
            updatedSongs[updatedSongIndex] = response.data;
            setSongs(updatedSongs);
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://s54-funny-songs.onrender.com/songs/${id}`);
            // Assuming you want to update the UI after successful deletion
            const filteredSongs = songs.filter(song => song._id !== id);
            setSongs(filteredSongs);
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };
    

    return (
        <div>
            <NavBar/>
            <div className="main-container">
                {songs.map(song => (
                    <div key={song._id} className="iframe-container">
                        <iframe
                            title={`spotifyTrack${song.SongId}`}
                            src={song.SongLink}
                            frameBorder="0"
                            allowFullScreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{ borderRadius: '12px', width: '100%', height: '60%', marginTop: "30px"}}
                        ></iframe>
                        <p>Artist : {song.Artist}</p>
                        <p>Release : {song.Release}</p>
                        <p>Category: {song.Category}</p>
                        <button onClick={() => handleUpdate(song._id)}>Update</button>
                        <button onClick={() => handleDelete(song._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default MainComponent;
