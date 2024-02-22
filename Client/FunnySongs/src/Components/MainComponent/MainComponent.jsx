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
    const [deleteLoadingId, setDeleteLoadingId] = useState(null);
    const [editSongId, setEditSongId] = useState(null);

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

    const handleDelete = async (songId) => {
        setDeleteLoadingId(songId);
        try {
            await axios.delete(`https://s54-funny-songs.onrender.com/delete/${songId}`);
            setSongs(prevSongs => prevSongs.filter(song => song.SongId !== songId));
            setTimeout(() => setDeleteLoadingId(null), 2000);
        } catch (error) {
            console.error('Error deleting song:', error);
            setDeleteLoadingId(null);
        }
    };

    const handleEdit = async (songId, updatedData) => {
        try {
            await axios.put(`https://s54-funny-songs.onrender.com/edit/${songId}`, updatedData);
            setSongs(prevSongs => 
                prevSongs.map(song => 
                    song.SongId === songId ? { ...song, ...updatedData } : song
                )
            );
            setOpenModal(false);
        } catch (error) {
            console.error('Error editing song:', error);
            // Handle error
        }
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setEditSongId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Check if the field is allowed to be edited
        if (['Artist', 'Release', 'Category'].includes(name)) {
            setNewSongData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    

    const handleFormSubmit = async () => {
        try {
            if (editSongId) {
                await handleEdit(editSongId, newSongData);
                setOpenModal(false);
                location.reload();
            } else {
                console.error('Adding new songs is not allowed in this function.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
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
                            <div key={song.SongId} className="iframe-container">
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
                                        <button onClick={() => handleDelete(song.SongId)} ><DeleteForever /></button>
                                        <button onClick={() => {setOpenModal(true); setEditSongId(song.SongId); setNewSongData(song);}}><EditIcon /></button>
                                        {deleteLoadingId === song.SongId && (
                                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                                <CircularProgress sx={{ color: "black" }} />
                                            </div>
                                        )}
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
