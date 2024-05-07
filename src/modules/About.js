import React, { useState, useEffect } from 'react';

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:xcaTd7yW/about_us', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='p-10 flex justify-center text-center'>
        {data ? (
          data.about.map((item, index) => (
            <div key={index}>
              <h1 className='font-extrabold'>About Us!</h1>
              <div className="container">
                <p>{item.about.replace('About Us !', '')}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
