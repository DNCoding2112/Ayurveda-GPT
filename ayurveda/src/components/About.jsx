import React, { useEffect, useState } from 'react';
import '../App.css';
import Loading from './Loading';

const About = () => {
    const [loading, setLoading] = useState(true);//added check for page loaded

    useEffect(() => {//loading functionality with timeout to ensure it happens smoothly and in sync
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="about-section">
            <h1>About Us</h1>
            <p>
                Welcome to our platform! We are dedicated to providing valuable resources and an interactive chat experience.
                Our team is passionate about using modern technology to bring knowledge and solutions to everyone.
            </p>
            <p>
                Feel free to explore our resources, connect with us via chat, or browse our Ayurveda books section to dive deeper into ancient wisdom.
            </p>
        </div>
    );
};

export default About;
