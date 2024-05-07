
import CustomSlider from "../component/CustomCarousel";
import "../App.css";
import React, { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function HeroSection() {
    const [imageUrls, setImageUrls] = useState([]);


    useEffect(() => {
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
        fetchImages();
    }, []);


    return (
        <div className="">
            <div className="relative ">
                


                <CustomSlider>
                    {imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                            <img src={url} alt={`Image ${index}`} />
                        </div>
                    ))}
                </CustomSlider>
            </div>




            

        </div>
    );
}

export default HeroSection;
