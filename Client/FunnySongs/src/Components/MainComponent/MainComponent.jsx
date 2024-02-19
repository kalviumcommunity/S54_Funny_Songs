import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, TextField, Box } from '@mui/material';
import "./MainComponent.css";
import NavBar from '../NavbarComponent/NavBar';
import Footer from '../FooterComponent/Footer';
import { DeleteForever } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MainComponent = () => {
    const [songs, setSongs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newSongData, setNewSongData] = useState({
        SongId: '',
        SongName: '',
        SongLink: '',
        Artist: '',
        Release: '',
        Category: '',
        likes: ''
    });

    useEffect(() => {
        axios.get('https://s54-funny-songs.onrender.com/songs')
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://s54-funny-songs.onrender.com/delete/${id}`);
            const filteredSongs = songs.filter(song => song._id !== id);
            setSongs(filteredSongs);
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSongData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = async () => {
        try {
            await axios.post('https://s54-funny-songs.onrender.com/post', newSongData);
            setOpenModal(false);
            // Optionally, you may reload the songs list or update it after successful addition
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    return (
        <div>
            <NavBar />
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
                            style={{ borderRadius: '12px', width: '100%', height: '60%', marginTop: "5px" }}
                        ></iframe>
                        <p>Artist : {song.Artist}</p>
                        <p>Release : {song.Release}</p>
                        <p>Category: {song.Category}</p>
                        <button onClick={() => handleDelete(song._id)}><DeleteForever/></button>
                    </div>
                ))}
                <Button
                    style={{ borderRadius: "100px", fontSize: "100px", minWidth: 0, width: 'auto', padding: '15px' , backgroundColor:"rgb(44, 44, 44)" }}
                    variant="contained"
                    onClick={handleModalOpen}
                >
                    <AddCircleIcon style={{ fontSize: "100px" }} />
                </Button>
            </div>
            {/* Modal */}
            <Modal open={openModal} onClose={handleModalClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding:0, width: 500, height:550, bgcolor: 'rgb(205, 205, 205)', borderRadius:"15px", boxShadow: 24, p: 4 }}>
                    <TextField name="SongName" label="Song Name" variant="outlined" fullWidth margin="normal" value={newSongData.SongName} onChange={handleInputChange} />
                    <TextField name="SongLink" placeholder='Enter the Embedded Spotify Song Link' label="Song Link" variant="outlined" fullWidth margin="normal" value={newSongData.SongLink} onChange={handleInputChange} />
                    <TextField name="Artist" label="Artist" variant="outlined" fullWidth margin="normal" value={newSongData.Artist} onChange={handleInputChange} />
                    <TextField name="Release" label="Release" variant="outlined" fullWidth margin="normal" value={newSongData.Release} onChange={handleInputChange} />
                    <TextField name="Category" label="Category" variant="outlined" fullWidth margin="normal" value={newSongData.Category} onChange={handleInputChange} />
                    <center>
                        <Button style={{marginTop:"30px"}} variant="contained" color="primary" onClick={handleFormSubmit}>Add Song</Button>
                    </center>
                </Box>
            </Modal>
            <Footer />
        </div>
    );
}

export default MainComponent;
