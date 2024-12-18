// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const FooterSection = styled.footer`
  padding: 60px 20px;
  background: #1A1A2E;
  color: #EAEAEA;
  text-align: center;

  .contact-info {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;

    a {
      color: #6C63FF;
      font-size: 2rem;
      transition: color 0.3s, transform 0.3s;

      &:hover {
        color: #FF6584;
        transform: scale(1.2);
      }
    }
  }

  p {
    font-size: 0.9rem;
  }
`;

const Footer = () => {
  return (
    <FooterSection id="contact">
      <motion.div
        className="contact-info"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <a href="mailto:email@example.com" aria-label="Email">
          <FaEnvelope />
        </a>
        <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        &copy; {new Date().getFullYear()} [Nama Anda]. Semua hak dilindungi.
      </motion.p>
    </FooterSection>
  );
};

export default Footer;
