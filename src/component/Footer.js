import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faYoutube,faInstagram } from '@fortawesome/free-brands-svg-icons';



function Footer() {
    return (
        <section id="footer">
            <div class="main-footer">
                <div class="logoinfo" data-aos="fade-up">
                    <h2>Responsive Footer</h2>
                    <p>By Sourav</p>

                    <div class="contact-details">
                        <h1>Contact Us</h1>
                        <li>
                            <div class="fa fa-phone"></div><a href="tel:+919326048690">+91 0987654321</a></li>
                        <li>
                            <div class="fa fa-envelope"></div><a href="mailto:yourmail@gmail.com">yourmail@gmail.com</a></li>

                    </div>
                </div>
                <div class="com " data-aos="fade-up">
                    <h1>About</h1>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h1>Social Media</h1>
                    <div class="sociallogos">
                        <div className="flex justify-between">
                            <FontAwesomeIcon icon={faInstagram}  color='#ffffff' />
                            <FontAwesomeIcon icon={faLinkedin}  color='#ffffff' />
                            <FontAwesomeIcon icon={faFacebook}  color='#ffffff' />
                            <FontAwesomeIcon icon={faYoutube}  color='#ffffff' />
                        </div>
                    </div>
                </div>
            </div>
            <footer>© Your Copyright 2021 All Rights Reserved</footer>
        </section >
    )
}

export default Footer