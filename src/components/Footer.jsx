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
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(108, 99, 255, 0.2) 25%,
      rgba(108, 99, 255, 0.5) 50%,
      rgba(108, 99, 255, 0.2) 75%,
      transparent 100%
    );
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;

  a {
    color: #6C63FF;
    font-size: 2rem;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: #FF6584;
      transform: translateY(-5px);
    }

    &:before {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: #FF6584;
      transition: width 0.3s ease;
    }

    &:hover:before {
      width: 100%;
    }
  }
`;

const FooterText = styled(motion.p)`
  font-size: 0.9rem;
  color: rgba(234, 234, 234, 0.8);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 20px;
`;

const FooterColumn = styled(motion.div)`
  text-align: center;

  h3 {
    color: #6C63FF;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;

      a {
        color: #EAEAEA;
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: 0.9rem;

        &:hover {
          color: #FF6584;
        }
      }
    }
  }
`;

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <FooterSection>
      <FooterGrid>
        <FooterColumn
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Navigation</h3>
          <ul>
            <motion.li variants={itemVariants}><a href="#home">Home</a></motion.li>
            <motion.li variants={itemVariants}><a href="#proyek">Proyek</a></motion.li>
            <motion.li variants={itemVariants}><a href="#keahlian">Keahlian</a></motion.li>
            <motion.li variants={itemVariants}><a href="#testimoni">Testimoni</a></motion.li>
          </ul>
        </FooterColumn>

        <FooterColumn
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Kontak</h3>
          <ContactInfo variants={itemVariants}>
            <motion.a
              href="https://linkedin.com/in/[your-profile]"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com/[your-username]"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="mailto:[your-email]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope />
            </motion.a>
          </ContactInfo>
        </FooterColumn>
      </FooterGrid>

      <FooterText
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} [Arvan Yudhistia Ardana]. Semua hak dilindungi.
      </FooterText>
    </FooterSection>
  );
};

export default Footer;