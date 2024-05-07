import React from 'react';
import Footer from '../component/Footer';
import Slideshow from '../component/HeroSection';
import work1 from '../images/hero1004.jpeg';
import ImageGallery from '../component/ImageGallery';


export default function Home() {

    return (

        <div>

            <Slideshow />
            {/* CARD1 WITH LEFT IMAGE */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8 bg-gray-100">
                {/* Left Column - Image */}
                <div className="lg:w-1/2">
                    <img src={work1} alt="Interior Furnishings" className="w-full h-auto rounded-lg shadow-lg" />
                </div>

                {/* Right Column - Content */}
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Primesofa and Furnishings - Interior Furnishings</h2>
                    <p className="text-lg mb-6">
                        At Primesofa and Furnishings, we are committed to creating sustainable and eco-friendly interior furnishings for your home or office. Our passion for modern design and attention to detail ensures that every piece of furniture we create is not only stylish, but comfortable and practical too. From sofas to beds, dining chairs to wardrobes, we have everything you need to make your space a reflection of your unique style and personality.
                    </p>
                </div>
            </div>
            {/* CARD1 WITH RIGHT IMAGE */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8 bg-gray-100">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Innovative Designs for Modern Living</h2>
                    <p className="text-lg mb-6">
                        At Primesofa and Furnishings, we believe that good design should not only look great but should also enhance your lifestyle. Our team of experienced designers and craftsmen work together to create innovative furniture designs that combine form and function, resulting in beautiful pieces that are a joy to use.
                    </p>
                </div>
                {/* Left Column - Image */}
                <div className="lg:w-1/2">
                    <img src={work1} alt="Interior Furnishings" className="w-full h-auto rounded-lg shadow-lg" />
                </div>



            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8 bg-gray-100">
                {/* Left Column - Image */}
                <div className="lg:w-1/2">
                    <img src={work1} alt="Interior Furnishings" className="w-full h-auto rounded-lg shadow-lg" />
                </div>

                {/* Right Column - Content */}
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Sustainable and Ethical Interior Furnishings
                    </h2>
                    <p className="text-lg mb-6">
                        We believe in taking responsibility for our impact on the environment and society. That's why we use sustainable materials and ethical manufacturing processes to create our furniture. From sourcing our materials to delivering our products, we aim to make a positive impact on the world. Choose Primesofa and Furnishings for beautiful and responsible interior furnishings.
                    </p>
                </div>
            </div>


            {/* //our services */}
            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                            <p className="text-lg text-gray-800 mb-6">
                                Primesofa and Furnishings is your destination for sustainable interior furnishings in India. We are passionate about crafting eco-friendly furniture that combines comfort and style. Our skilled craftsmen use eco-conscious materials and practices to create high-quality pieces that enhance your living or work space.
                            </p>
                            <p className="text-lg text-gray-800">
                                Based in Bengaluru, we deliver our unique and sustainable furniture to homes and businesses across India. Explore our collection today and experience the perfect blend of comfort, style, and sustainability with Primesofa and Furnishings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          
            <ImageGallery/>

            <Footer />

        </div>

    );

}