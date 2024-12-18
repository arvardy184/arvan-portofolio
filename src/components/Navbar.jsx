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
  background: ${({ scrolled }) => (scrolled ? 'rgba(26, 26, 46, 0.95)' : 'transparent')};
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(10px)' : 'none')};
  z-index: 1000;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const Logo = styled(motion.a)`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(45deg, #6C63FF, #FF6584);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;

  a {
    color: #EAEAEA;
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.3s;

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      background: #FF6584;
      left: 0;
      bottom: -5px;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #FF6584;
      
      &:after {
        width: 100%;
      }
    }
  }
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #EAEAEA;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  z-index: 1000;
  box-shadow: -5px 0px 25px rgba(0, 0, 0, 0.3);

  a {
    font-size: 1.5rem;
    color: #EAEAEA;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: #FF6584;
      transform: translateX(10px);
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
      }
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      }
    }
  };

  const navItems = [
    { title: "Home", href: "#home" },
    { title: "Proyek", href: "#proyek" },
    { title: "Keahlian", href: "#keahlian" },
    { title: "Testimoni", href: "#testimoni" },
    { title: "Kontak", href: "#kontak" }
  ];

  return (
    <>
      <Nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        scrolled={scrolled}
      >
        <Logo
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MyPortfolio
        </Logo>

        <NavLinks>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <a href={item.href}>{item.title}</a>
            </NavItem>
          ))}
        </NavLinks>

        <HamburgerButton
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </HamburgerButton>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <MobileMenu
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </motion.a>
              ))}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;