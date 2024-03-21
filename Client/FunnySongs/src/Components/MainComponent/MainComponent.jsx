import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, TextField, Box, LinearProgress, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import "./MainComponent.css";
import NavBar from '../NavbarComponent/NavBar';
import Footer from '../FooterComponent/Footer';
import { DeleteForever } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import Formlogo from "../Assets/Logo.png";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const MainComponent = () => {
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newSongData, setNewSongData] = useState({
        SongName: '',
        SongLink: '',
        Artist: '',
        Release: '',
        Category: '',
        Created_by: ''
    });

    const [loading, setLoading] = useState(true);
    const [deleteLoadingId, setDeleteLoadingId] = useState(null);
    const [editSongId, setEditSongId] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState('All');

    useEffect(() => {
        setLoading(true);
        const delay = setTimeout(() => {
            axios.get('https://songs-sand.vercel.app/songs')
                .then(response => {
                    setSongs(response.data);
                    setFilteredSongs(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching songs:', error);
                    setLoading(false);
                });
            axios.get('https://songs-sand.vercel.app/users')
                .then(response => {
                    const userNames = response.data.map(user => user.FirstName); // Update this line to match the user data structure
                    setUsers(userNames);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }, 2000);
        return () => clearTimeout(delay);
    }, []);


    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
            // Get user's first name from cookie
            const userInfo = JSON.parse(atob(token.split('.')[1]));
            const firstName = userInfo.firstName;
            setUserName(firstName);
        }
    }, []);


    const handleDelete = async (songId) => {
        if (!isLoggedIn) {
            navigate('/signup');
            return;
        }
        setDeleteLoadingId(songId);
        try {
            await axios.delete(`https://songs-sand.vercel.app/delete/${songId}`);
            setSongs(prevSongs => prevSongs.filter(song => song.SongId !== songId));
            setFilteredSongs(prevSongs => prevSongs.filter(song => song.SongId !== songId));
            setTimeout(() => setDeleteLoadingId(null), 2000);
        } catch (error) {
            console.error('Error deleting song:', error);
            setDeleteLoadingId(null);
        }
    };

    const handleEdit = async (songId, updatedData) => {
        if (!isLoggedIn) {
            alert('Please login to edit the data.');
            navigate("/signup")
            return;
        }
        try {
            await axios.put(`https://songs-sand.vercel.app/edit/${songId}`, updatedData);
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
        if (!isLoggedIn) {
            navigate('/signup');
            alert(('Login to Edit the Data'))
            return;
        }
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Retrieve the first name from the cookie
        const firstName = Cookies.get('firstName');

        const SongData = { ...newSongData, Created_by: firstName };

        try {
            // Post the new song data
            await axios.post('https://songs-sand.vercel.app/post', SongData);

            // Close the modal
            handleModalClose();
            location.reload()

            // Show success message
            toast.success('Song added successfully!');

            // Redirect after 2 seconds
            setTimeout(() => {
                setIsLoggedIn(true);
                navigate('/Main');
            }, 2000);
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };


    const validateForm = () => {
        const errors = {};
        if (!newSongData.SongName) {
            errors.SongName = 'Song Name is required';
        }
        if (!newSongData.SongLink) {
            errors.SongLink = 'Song Link is required';
        }
        if (!newSongData.Artist) {
            errors.Artist = 'Artist is required';
        }
        if (!newSongData.Release) {
            errors.Release = 'Release is required';
        } else if (isNaN(newSongData.Release)) {
            errors.Release = 'Release must be a number';
        }
        if (!newSongData.Category) {
            errors.Category = 'Category is required';
        }
        return errors;
    };

    const handleUserSelect = (selectedUser) => {
        setSelectedUser(selectedUser);
        if (selectedUser === 'All') {
            setFilteredSongs(songs);
        } else {
            const filtered = songs.filter(song => song.Created_by === selectedUser);
            setFilteredSongs(filtered);
        }
    };


    return (
        <div>
            <ToastContainer />
            <NavBar />
            <div className="dropdown-container">
                <center>
                <FormControl variant="outlined"  fullWidth margin="normal" style={{ width: '200px',backgroundColor:"gray",marginTop:"30px"}}>
                    <InputLabel id="user-select-label">Select User</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="user-select"    
                        value={selectedUser}
                        onChange={(e) => handleUserSelect(e.target.value)}
                        label="Select User"
                    >
                        <MenuItem value="All">All Users</MenuItem>
                        {users.map((user, index) => (
                            <MenuItem key={index} value={user}>{user}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </center>
            </div>

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
                        {filteredSongs.map(song => (
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
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 0, width: 500, height: 800, bgcolor: 'rgb(205, 205, 205)', borderRadius: "15px", boxShadow: 24, p: 4 }}>
                    <center>
                        <img width={"280px"} src={Formlogo} alt="" />
                    </center>
                    <TextField name="SongName" label="Song Name" variant="outlined" fullWidth margin="normal" value={newSongData.SongName} onChange={handleInputChange} error={!!formErrors.SongName} helperText={formErrors.SongName} />
                    <TextField name="SongLink" placeholder='Enter the Embedded Spotify Song Link' label="Song Link" variant="outlined" fullWidth margin="normal" value={newSongData.SongLink} onChange={handleInputChange} error={!!formErrors.SongLink} helperText={formErrors.SongLink} />
                    <TextField name="Artist" label="Artist" variant="outlined" fullWidth margin="normal" value={newSongData.Artist} onChange={handleInputChange} error={!!formErrors.Artist} helperText={formErrors.Artist} />
                    <TextField name="Release" label="Release" variant="outlined" fullWidth margin="normal" value={newSongData.Release} onChange={handleInputChange} error={!!formErrors.Release} helperText={formErrors.Release} />
                    <TextField name="Category" label="Category" variant="outlined" fullWidth margin="normal" value={newSongData.Category} onChange={handleInputChange} error={!!formErrors.Category} helperText={formErrors.Category} />
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
