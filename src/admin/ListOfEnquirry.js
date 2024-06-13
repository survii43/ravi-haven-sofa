import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ListOfEnquirry() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetchData();
      } else {
        setContacts([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = () => {
    const database = firebase.database();
    const contactsRef = database.ref('Contacts');

    contactsRef.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setContacts(contactsArray);
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <h2>List of Enquiries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ListOfEnquirry;
