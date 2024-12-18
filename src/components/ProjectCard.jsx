// src/components/ProjectCard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';


const Card = styled(motion.div)`
  background: #1A1A2E;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(108, 99, 255, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(108, 99, 255, 0.3);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
    transition: transform 0.3s;

   
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #6C63FF;
  }

  p {
    font-size: 1rem;
    color: #EAEAEA;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 46, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: #2E2E3A;
  padding: 40px;
  border-radius: 15px;
  width: 80%;
  max-width: 700px;
  position: relative;
  color: #EAEAEA;

  button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #FF6584;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
    font-size: 1rem;
    transition: background 0.3s;

    &:hover {
      background: #6C63FF;
    }
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #6C63FF, #FF6584);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  .technologies {
    list-style: none;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;

    li {
      background: #6C63FF;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.9rem;
    }
  }

  .links a {
    margin-right: 15px;
    font-size: 1.2rem;
    color: #FF6584;
    transition: color 0.3s;

    &:hover {
      color: #6C63FF;
    }
  }
`;

const ProjectCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >

        <img src={project.image} alt={project.title} loading="lazy" />

        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
      </Card>

      <AnimatePresence>
        {isOpen && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <ModalContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsOpen(false)}><FaTimes /></button>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <h4>Teknologi yang Digunakan:</h4>
              <ul className="technologies">
                {project.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
              <div className="links">
                {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live Demo</a>}
                {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer"><FaGithub /> Repositori</a>}
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
