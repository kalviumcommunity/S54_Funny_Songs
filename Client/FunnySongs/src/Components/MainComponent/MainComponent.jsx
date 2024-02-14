import React from 'react';
import "./MainComponent.css"

const MainComponent = () => {
    return (
        <div className="main-container">
            {/* First iframe */}
            <div className="iframe-container">
                <iframe
                    title="spotifyTrack1"
                    src="https://open.spotify.com/embed/track/5VD0r0qDYCJvYGNO5wX4ch?utm_source=generator"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px', width: '90%', height: '250px' , marginTop:"30px" }}
                ></iframe>
                <p>Artist : Funny Song Studio</p>
                <p>Release : 2022</p>
                <p>Category: Audio</p>
            </div>

            {/* Second iframe */}
            <div className="iframe-container">
                <iframe
                    title="spotifyTrack3"
                    src="https://open.spotify.com/embed/track/1AOQfIk6infkdfp09vkHvI?utm_source=generator&theme=0"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px', width: '90%', height: '250px' , marginTop:"30px" }}
                ></iframe>
                <p>Artist : Funny Minions Guy</p>
                <p>Release : 2021</p>
                <p>Category: Audio</p>
            </div>
            
            {/* Third iframe */}
            <div className="iframe-container">
                <iframe
                    title="spotifyTrack2"
                    src="https://open.spotify.com/embed/track/0Bo5fjMtTfCD8vHGebivqc?utm_source=generator"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px', width: '90%', height: '250px' , marginTop:"30px" }}
                ></iframe>
                <p>Artist: Crazy Frog</p>
                <p>Release : 2005</p>
                <p>Category: Music</p>
            </div>

            

            {/* Fourth iframe */}
            <div className="iframe-container">
                <iframe
                    title="spotifyTrack4"
                    src="https://open.spotify.com/embed/track/3xZek9XkEaX130o3XN9cvd?utm_source=generator"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px', width: '90%', height: '250px' , marginTop:"30px" }}
                ></iframe>
                <p>Artist: Spongebob Squarepants</p>
                <p>Release : 2020</p>
                <p>Category: Audio</p>
            </div>

            {/* Fifth iframe */}
            <div className="iframe-container">
                <iframe
                    title="spotifyTrack5"
                    src="https://open.spotify.com/embed/track/386RUes7n1uM1yfzgeUuwp?utm_source=generator"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px', width: '90%', height: '250px' , marginTop:"30px" }}  
                ></iframe>
                <p>Artist: Bruno Mars</p>
                <p>Release : 2010</p>
                <p>Category: Song</p>
            </div>

            {/* Sixth iframe */}
            <div className="iframe-container">
                <iframe
                    title="spotifyTrack6"
                    src="https://open.spotify.com/embed/track/0wh2YLhRJbWW6yQZd0Hokq?utm_source=generator"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px', width: '90%', height: '250px' , marginTop:"30px" }}
                ></iframe>
                <p>Artist : Funny Minions Guy</p>
                <p>Release : 2022</p>
                <p>Category: Audio</p>
            </div>
        </div>
    );
}

export default MainComponent;

