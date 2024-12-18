// src/components/Home.jsx
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import profilePic from '../assets/images/profile.jpg';

const HomeSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #1A1A2E;
  padding: 100px 0;
`;

const ParticlesBackground = styled(Particles)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const HomeContent = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 60px;
  color: #EAEAEA;
  text-align: left;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`;

const ProfileImage = styled(motion.img)`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #6C63FF;
  box-shadow: 0 0 25px rgba(108, 99, 255, 0.6);

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const ProfileImageOverlay = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid #6C63FF;
  border-radius: 50%;
  opacity: 0.5;
`;

const IntroContent = styled(motion.div)`
  max-width: 600px;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    background: linear-gradient(90deg, #6C63FF, #FF6584);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #EAEAEA;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Button = styled(motion.button)`
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: #6C63FF;
    color: white;
    border: none;

    &:hover {
      background: #5A52CC;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: transparent;
    color: #6C63FF;
    border: 2px solid #6C63FF;

    &:hover {
      background: rgba(108, 99, 255, 0.1);
      transform: translateY(-2px);
    }
  }
`;

const Home = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "#1A1A2E",
      },
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: { 
          enable: true, 
          mode: "push" 
        },
        onHover: { 
          enable: true, 
          mode: "repulse",
          parallax: { 
            enable: true, 
            force: 60, 
            smooth: 10 
          }
        },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { 
          distance: 200, 
          duration: 0.4 
        },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#6C63FF",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <HomeSection id="home">
      <ParticlesBackground
        init={particlesInit}
        options={particlesOptions}
      />
      
      <HomeContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileImageContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProfileImage 
            src={profilePic} 
            alt="Profile"
            whileHover={{ scale: 1.05 }}
          />
          <ProfileImageOverlay
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </ProfileImageContainer>

        <IntroContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Halo, Saya [Nama Anda]
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Saya adalah seorang Software Engineer yang berfokus pada desain yang elegan, 
            interaktif, dan responsif. Dengan pengalaman dalam berbagai teknologi modern, 
            saya menciptakan solusi yang inovatif dan efisien.
          </motion.p>

          <ActionButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button 
              className="primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Proyek
            </Button>
            <Button 
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hubungi Saya
            </Button>
          </ActionButtons>
        </IntroContent>
      </HomeContent>
    </HomeSection>
  );
};

export default Home;