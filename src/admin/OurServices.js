// import React from 'react'

// function OurServices () {
//   return (
//     <div>OurServices</div>
//   )
// }

// export default OurServices

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import firebase from '../firebase/firebase';

const OurServices = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!file) {
                console.error('No file selected.');
                return;
            }

            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`images/${file.name}`);
            await fileRef.put(file);

            const imageUrl = await fileRef.getDownloadURL();

            // Store title, description, and image URL in Firestore
            await firebase.firestore().collection('images').add({
                title,
                description,
                imageUrl,
            });

            // Clear form fields after successful submission
            setTitle('');
            setDescription('');
            setFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, fetch images
                fetchImages();
            } else {
                // User is signed out, do something (redirect to sign-in page, etc.)
            }
        });

        // Clean up listener
        return () => unsubscribe();
    }, []);

    const fetchImages = async () => {
        try {
            const storageRef = firebase.storage().ref();
            const imagesRef = storageRef.child('images');
            const imageList = await imagesRef.listAll();
            // Get download URLs for each image
            const urls = await Promise.all(
                imageList.items.map(async (imageRef) => {
                    return await imageRef.getDownloadURL();
                })
            );
            setImageUrls(urls);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                fullWidth
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                multiline
                rows={4}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Upload
            </Button>
        </form>
    );
};

export default OurServices;
