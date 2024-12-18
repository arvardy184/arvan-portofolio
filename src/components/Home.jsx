// src/components/Home.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import profilePic from '../assets/images/profile.jpg';
import Particles from 'react-tsparticles';

const HomeSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ParticlesBackground = styled(Particles)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const HomeContent = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 40px;
  color: #EAEAEA;
  text-align: left;
  padding: 20px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid #6C63FF;
    box-shadow: 0 0 20px rgba(108, 99, 255, 0.6);
  }

  .intro-text {
    max-width: 600px;

    h1 {
      font-size: 3rem;
      background: linear-gradient(90deg, #6C63FF, #FF6584);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.6;
      color: #EAEAEA;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    img {
      width: 150px;
      height: 150px;
    }

    .intro-text h1 {
      font-size: 2.5rem;
    }

    .intro-text p {
      font-size: 1rem;
    }
  }
`;

const Home = () => {
  const particlesOptions = {
    background: {
      color: {
        value: "#1A1A2E",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { particles_nb: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: { color: "#6C63FF", distance: 150, enable: true, opacity: 0.5, width: 1 },
      collisions: { enable: false },
      move: { direction: "none", enable: true, outMode: "bounce", random: false, speed: 2, straight: false },
      number: { density: { enable: true, value_area: 800 }, value: 50 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { random: true, value: 3 },
    },
    detectRetina: true,
  };

  return (
    <HomeSection id="home">
      <ParticlesBackground params={particlesOptions} />
      <HomeContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={profilePic} alt="Profil" />
        <div className="intro-text">
          <h1>Halo, Saya [Nama Anda]</h1>
          <p>
            Saya adalah seorang Software Engineer yang berfokus pada desain yang elegan, interaktif, dan responsif.
            Dengan pengalaman dalam berbagai teknologi modern, saya menciptakan solusi yang inovatif dan efisien.
          </p>
        </div>
      </HomeContent>
    </HomeSection>
  );
};

export default Home;
