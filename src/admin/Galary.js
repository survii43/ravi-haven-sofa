import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import firebase from '../firebase/firebase';
import CloseIcon from '@mui/icons-material/Close';

const Galary = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    //upload image
    const [file, setFile] = useState(null);
    
    const [fileName, setFileName] = useState('');
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleClearFile = () => {
        setFile(null);
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
            const imagesRef = storageRef.child('galary');
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

   
    const handleUploadGalary = async () => {
        try {
          if (!file) {
            console.error('No file selected.');
            return;
          }
      
          const storageRef = firebase.storage().ref();
          // Specify the path to the hero_section folder and include the file name
          const fileRef = storageRef.child(`galary/${file.name}`);
          await fileRef.put(file);
          console.log('File uploaded successfully.');
          
          // Clear input field after successful upload
          setFile(null);
          fetchImages();
        } catch (error) {
          console.error('Error uploading file:', error);
        }
    };
      

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setDeleteDialogOpen(true);
    };


    const handleDeleteConfirm = async () => {
        try {
            const imageUrl = imageUrls[selectedId];
            // Delete image from Firebase Storage
            const storageRef = firebase.storage().refFromURL(imageUrl);
            await storageRef.delete();

            // Update state to remove deleted image
            setImageUrls((prevImageUrls) =>
                prevImageUrls.filter((url, index) => index !== selectedId)
            );
        } catch (error) {
            console.error('Error deleting image:', error);
        }
        setDeleteDialogOpen(false);
    };

    return (
        <div className='w-[30%]'>
            <div className='border '>
        <div>Galary</div>
        <div className='flex flex-col items-center border rounded p-4'>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-file-galary"
        />
        <label htmlFor="upload-file-galary" className="cursor-pointer mb-2">
          Choose File
        </label>
        {file && (
          <div className="flex items-center justify-between mb-2 w-full">
            <p className="truncate mr-2">{file.name}</p>
            <Button onClick={handleClearFile}>
              <CloseIcon />
            </Button>
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadGalary}
          disabled={!file}
        >
          Upload
        </Button>
      </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {imageUrls.map((url, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <img src={url} alt={`Image ${index}`} width="100" height="100" />
                                </TableCell>
                                <TableCell>
                                    
                                    <IconButton onClick={() => handleDeleteClick(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this image?</DialogContentText>
                    <Button onClick={handleDeleteConfirm}>Confirm</Button>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                </DialogContent>
            </Dialog>
        </div>
        </div>
    );
};

export default Galary;
