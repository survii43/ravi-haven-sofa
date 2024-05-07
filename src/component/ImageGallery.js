import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const ImageGallery = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleToggleImages = () => {
    setShowAllImages(!showAllImages);
    if (!showAllImages && imageUrls.length === 0) {
      fetchImages();
    }
  };

  const visibleImages = showAllImages ? imageUrls : imageUrls.slice(0, 4);

  useEffect(() => {
    fetchImages();
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

  return (
    <>
      <div className="m-[30px]">
        <div className="container mx-auto px-4 pm-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleImages.map((imageUrl, index) => (
              <div key={index} className="relative aspect-w-1 aspect-h-1">
                <img src={imageUrl} alt={`Image ${index}`} className="object-cover w-full h-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center m-[40px]">
        <button
          onClick={handleToggleImages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {showAllImages ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </>
  );
};

export default ImageGallery;
