import React from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  width: 100%;
`;

const HeaderContent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: url('../assets/images/background.jpg') center/cover no-repeat;
  height: 100vh;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Navbar />
      <HeaderContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Konten Header seperti logo atau tagline */}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
