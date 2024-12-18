// src/components/Header.jsx
import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/images/background.jpg') center/cover no-repeat;
  z-index: -1;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(26, 26, 46, 0.9) 0%,
      rgba(26, 26, 46, 0.7) 100%
    );
  }
`;

const HeaderContent = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: #EAEAEA;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #6C63FF, #FF6584);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 600px;
  margin-bottom: 30px;
  line-height: 1.6;
  color: rgba(234, 234, 234, 0.9);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  color: rgba(234, 234, 234, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #6C63FF;
  border-radius: 50%;
`;

const Header = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeaderContainer>
      <BackgroundImage />
      <Navbar />
      
      <HeaderContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Selamat Datang di Portfolio Saya
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Mengubah ide menjadi solusi digital yang inovatif dan efektif
        </Subtitle>

        <motion.button
          className="bg-[#6C63FF] hover:bg-[#5A52CC] text-white px-8 py-3 rounded-full font-medium transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Lihat Portfolio
        </motion.button>

        <ScrollIndicator
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ScrollText>Scroll</ScrollText>
          <ScrollDot
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </ScrollIndicator>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;