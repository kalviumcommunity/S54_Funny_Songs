import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, TextField, Box, LinearProgress, CircularProgress } from '@mui/material';
import "./MainComponent.css";
import NavBar from '../NavbarComponent/NavBar';
import Footer from '../FooterComponent/Footer';
import { DeleteForever } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import Formlogo from "../Assets/Logo.png";


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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const delay = setTimeout(() => {
            axios.get('https://s54-funny-songs.onrender.com/songs')
            .then(response => {
                setSongs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
                setLoading(false);
            });
        }, 2000);
        return () => clearTimeout(delay);
    }, []);


    

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
            location.reload();
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    return (
        <div>
            <NavBar />
            {loading && (
                <center>
                    <div style={{ marginTop: "310px", width: '20%' }} className="loading-container">
                        <LinearProgress sx={{ color: "black" }} />
                    </div>
                </center>
            )}
            <div className="main-container">
                {!loading && (
                    <>
                        {songs.map(song => (
                            <div key={song._id} className="iframe-container">
                                <iframe
                                    title={`spotifyTrack${song.SongId}`}
                                    src={song.SongLink}
                                    frameBorder="0"
                                    allowFullScreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    style={{ borderRadius: '12px', width: '100%', height: '60%', marginTop: "15px", position: "relative" }}
                                ></iframe>
                                <p>Artist : {song.Artist}</p>
                                <p>Release : {song.Release}</p>
                                <p>Category: {song.Category}</p>
                                <center>
                                    <div className='edit-delete' >
                                        <button><DeleteForever /></button>
                                        <button><EditIcon /></button>
                                    </div>
                                </center>
                            </div>
                        ))}
                        
                        <div className='AddButton' >
                            <Button
                                style={{ height: "500px", borderRadius: "50px", fontSize: "200px", minWidth: 0, width: '100%', padding: '15px', backgroundColor: "rgb(44, 44, 44)" }}
                                variant="contained"
                                onClick={handleModalOpen}
                            >
                                <AddCircleIcon style={{ fontSize: "100px" }} />
                            </Button>
                        </div>
                    </>
                )}
            </div>
            {/* Modal */}
            <Modal open={openModal} onClose={handleModalClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 0, width: 500, height: 680, bgcolor: 'rgb(205, 205, 205)', borderRadius: "15px", boxShadow: 24, p: 4 }}>
                    <center>
                        <img width={"280px"} src={Formlogo} alt="" />
                    </center>
                    <TextField name="SongName" label="Song Name" variant="outlined" fullWidth margin="normal" value={newSongData.SongName} onChange={handleInputChange} />
                    <TextField name="SongLink" placeholder='Enter the Embedded Spotify Song Link' label="Song Link" variant="outlined" fullWidth margin="normal" value={newSongData.SongLink} onChange={handleInputChange} />
                    <TextField name="Artist" label="Artist" variant="outlined" fullWidth margin="normal" value={newSongData.Artist} onChange={handleInputChange} />
                    <TextField name="Release" label="Release" variant="outlined" fullWidth margin="normal" value={newSongData.Release} onChange={handleInputChange} />
                    <TextField name="Category" label="Category" variant="outlined" fullWidth margin="normal" value={newSongData.Category} onChange={handleInputChange} />
                    <center>
                        <Button style={{ marginTop: "30px", backgroundColor: "black" }} variant="contained" onClick={handleFormSubmit}>Add Song</Button>
                    </center>
                </Box>
            </Modal>
            <Footer />
        </div>
    );
}

export default MainComponent;
