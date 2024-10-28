import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AyurvedaBooks from "../components/AyurvedaBooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import styles from "../styles/App.module.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {//loading functionality for default page
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {//loading functionality for routing
    if (location.pathname === "/") {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  const features = [
    {
      title: "Personalized Guidance",
      description: "Get personalized Ayurvedic advice based on your health and lifestyle.",
    },
    {
      title: "Natural Remedies",
      description: "Explore natural remedies and herbal solutions recommended by AyurGenius.",
    },
    {
      title: "Wellness Tips",
      description: "Receive daily wellness tips and Ayurvedic practices to enhance your overall well-being.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + features.length) % features.length);
  };

  return (
    loading ? (
      <Loading />
    ) : (
      <div className={styles.app}>
        <Header />
        <section className={styles.features}>
          <h2 className={styles.featuresHeading}>Features</h2>
          <div className={styles.carousel}>
            <button className={`${styles.carouselBtn} ${styles.left}`} onClick={prevSlide}>
              &#60;
            </button>
            <div
              className={styles.carouselInner}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div className={styles.carouselItem} key={index}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
            <button className={`${styles.carouselBtn} ${styles.right}`} onClick={nextSlide}>
              &#62;
            </button>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to Experience AyurGenius?</h2>
          <p>Start your Ayurvedic journey today and discover a healthier you!</p>
          <Link className={styles.ctaButton} to="/chat">Get Started</Link>
        </section>

        <section className={styles.books}>
          <h2>Explore Ayurvedic Books</h2>
          <AyurvedaBooks />
        </section>
        <Footer />
      </div>
    )
  );
};

export default Home;
