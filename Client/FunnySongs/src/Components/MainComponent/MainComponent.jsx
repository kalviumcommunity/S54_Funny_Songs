import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainComponent.css";
import NavBar from '../NavbarComponent/NavBar';
import Footer from '../FooterComponent/Footer';

const MainComponent = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API 
        axios.get('https://s54-funny-songs.onrender.com')
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }, []);

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
                            style={{ borderRadius: '12px', width: '100%', height: '250px', marginTop: "30px"}}
                        ></iframe>
                        <p>Artist : {song.Artist}</p>
                        <p>Release : {song.Release}</p>
                        <p>Category: {song.Category}</p>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default MainComponent;



