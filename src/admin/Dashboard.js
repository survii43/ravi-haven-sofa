import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';//AdminLogin
import AdminLogin from '../admin/AdminLogin';
import HeroSectionAdmin from './HeroSectionAdmin';//Galary
import Galary from '../admin/Galary';//Galary


function Dashboard() {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Fetch images from Firebase Database based on user's folder
    const fetchImages = async () => {
      if (user) {
        const snapshot = await firebase.database().ref(`images/${user.uid}`).once('value');
        if (snapshot.exists()) {
          setImages(snapshot.val());
        }
      }
    };

    fetchImages();
  }, [user]);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <div> <p>Welcome, {user?.email}</p>
                <button className="w-[200px] bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600" onClick={handleLogout}>Logout</button>

      {user ? (
        <div className='flex justify-evenly'>
         
          <HeroSectionAdmin/>
          <Galary/>
          
        </div>
      ) : (
        <AdminLogin />
      )}
    </div>
  );
}

export default Dashboard;