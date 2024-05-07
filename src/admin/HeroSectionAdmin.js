// import React, { useState } from 'react';
// import { render } from 'react-dom';
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';

// const dummyData = [
//   { id: 1, name: 'John', age: 30, email: 'john@example.com' },
//   { id: 2, name: 'Doe', age: 25, email: 'doe@example.com' },
//   { id: 3, name: 'Jane', age: 35, email: 'jane@example.com' },
// ];

// const MyTable = () => {
//   const [data, setData] = useState(dummyData);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [addDialogOpen, setAddDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [newData, setNewData] = useState({});

//   const handleEditClick = (id) => {
//     const selectedRow = data.find((item) => item.id === id);
//     setEditedData(selectedRow);
//     setSelectedId(id);
//     setEditDialogOpen(true);
//   };

//   const handleAddClick = () => {
//     setAddDialogOpen(true);
//   };

//   const handleDeleteClick = (id) => {
//     setSelectedId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleEditSave = () => {
//     setData((prevData) =>
//       prevData.map((item) => (item.id === selectedId ? editedData : item))
//     );
//     setEditDialogOpen(false);
//   };

//   const handleAddSave = () => {
//     const id = data.length + 1;
//     setData([...data, { ...newData, id }]);
//     setAddDialogOpen(false);
//   };

//   const handleDeleteConfirm = () => {
//     setData((prevData) => prevData.filter((item) => item.id !== selectedId));
//     setDeleteDialogOpen(false);
//   };

//   return (
//     <>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Age</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.age}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditClick(row.id)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteClick(row.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Edit Dialog */}
//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>Edit Data</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Edit the data fields:</DialogContentText>
//           <TextField
//             label="Name"
//             value={editedData.name || ''}
//             onChange={(e) =>
//               setEditedData({ ...editedData, name: e.target.value })
//             }
//           />
//           <TextField
//             label="Age"
//             value={editedData.age || ''}
//             onChange={(e) =>
//               setEditedData({ ...editedData, age: e.target.value })
//             }
//           />
//           <TextField
//             label="Email"
//             value={editedData.email || ''}
//             onChange={(e) =>
//               setEditedData({ ...editedData, email: e.target.value })
//             }
//           />
//           <Button onClick={handleEditSave}>Save</Button>
//         </DialogContent>
//       </Dialog>

//       {/* Add Dialog */}
//       <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
//         <DialogTitle>Add New Entry</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Enter the new data:</DialogContentText>
//           <TextField
//             label="Name"
//             value={newData.name || ''}
//             onChange={(e) =>
//               setNewData({ ...newData, name: e.target.value })
//             }
//           />
//           <TextField
//             label="Age"
//             value={newData.age || ''}
//             onChange={(e) =>
//               setNewData({ ...newData, age: e.target.value })
//             }
//           />
//           <TextField
//             label="Email"
//             value={newData.email || ''}
//             onChange={(e) =>
//               setNewData({ ...newData, email: e.target.value })
//             }
//           />
//           <Button onClick={handleAddSave}>Add</Button>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Delete Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this record?
//           </DialogContentText>
//           <Button onClick={handleDeleteConfirm}>Confirm</Button>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//         </DialogContent>
//       </Dialog>

//       {/* Add Button */}
//       <IconButton onClick={handleAddClick}>
//         <AddIcon />
//       </IconButton>
//     </>
//   );
// };

// export default MyTable;


import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { Button, TextField } from '@mui/material';
import firebase from '../firebase/firebase';
import CloseIcon from '@mui/icons-material/Close';

const HeroSectionAdmin = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editedData, setEditedData] = useState({});
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
            const imagesRef = storageRef.child('hero_section');
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

   
    const handleUpload = async () => {
        try {
          if (!file) {
            console.error('No file selected.');
            return;
          }
      
          const storageRef = firebase.storage().ref();
          // Specify the path to the hero_section folder and include the file name
          const fileRef = storageRef.child(`hero_section/${file.name}`);
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
        <div className='w-[40%]'>
            <div className='border '>
        <div>Hero Section</div>
        <div className='flex flex-col items-center border rounded p-4'>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-file"
        />
        <label htmlFor="upload-file" className="cursor-pointer mb-2">
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
          onClick={handleUpload}
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

export default HeroSectionAdmin;
