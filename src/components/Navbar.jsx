// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';


const Nav = styled(motion.nav)`
  position: fixed;
  width: 100%;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ scrolled }) => (scrolled ? 'rgba(26, 26, 46, 0.9)' : 'transparent')};
  backdrop-filter: blur(10px);
  z-index: 1000;

  .logo {
    font-size: 1.8rem;
    font-weight: bold;
    background: linear-gradient(45deg, #6C63FF, #FF6584);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 30px;

    li {
      position: relative;

      a {
        font-size: 1rem;
        transition: color 0.3s;

        &:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background: #FF6584;
          left: 0;
          bottom: -5px;
          transition: width 0.3s;
        }

        &:hover:after {
          width: 100%;
        }
      }
    }
  }

  .hamburger {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .hamburger {
      display: block;
      color: #EAEAEA;
    }
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 60%;
  height: 100vh;
  background: #1A1A2E;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  z-index: 1500;

  a {
    font-size: 1.5rem;
    color: #EAEAEA;
    transition: color 0.3s;

    &:hover {
      color: #FF6584;
    }
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 80 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={scrolled ? { y: 0 } : { y: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo">MyPortfolio</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Proyek</a></li>
          <li><a href="#skills">Keahlian</a></li>
          <li><a href="#testimonials">Testimoni</a></li>
          <li><a href="#contact">Kontak</a></li>
        </ul>
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <FaBars />
        </div>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <FaTimes size={30} color="#EAEAEA" onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }} />
            <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#projects" onClick={() => setIsOpen(false)}>Proyek</a>
            <a href="#skills" onClick={() => setIsOpen(false)}>Keahlian</a>
            <a href="#testimonials" onClick={() => setIsOpen(false)}>Testimoni</a>
            <a href="#contact" onClick={() => setIsOpen(false)}>Kontak</a>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
