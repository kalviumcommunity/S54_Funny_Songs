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

    const handleUpdate = (id) => {
        // Implement your logic for updating the song here
        console.log('Updating song with ID:', id);
    };

    const handleDelete = async (songId) => {
        try {
            // Send a DELETE request to delete the song with the given SongId
            await axios.delete(`https://s54-funny-songs.onrender.com/delete/${songId}`);
            // Remove the deleted song from the state
            setSongs(songs.filter(song => song.SongId !== songId));
            console.log('Song deleted successfully:', songId);
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
                        {/* <button onClick={() => handleUpdate(song._id)}>Update</button> */}
                        {/* <button onClick={() => handleDelete(song._id)}>Delete</button> */}
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default MainComponent;
