// src/components/ProjectCard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaTimes, FaArrowRight } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &::before {
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

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(26, 26, 46, 0.8) 100%
    );
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #6C63FF, #FF6584);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #EAEAEA;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const Tag = styled(motion.span)`
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 15px;
  background: rgba(108, 99, 255, 0.1);
  color: #6C63FF;
  border: 1px solid rgba(108, 99, 255, 0.3);
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: #2E2E3A;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  position: relative;
  overflow: hidden;

  .modal-header {
    position: relative;
    height: 250px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(46, 46, 58, 1) 100%
      );
    }
  }

  .modal-body {
    padding: 40px;
    position: relative;
    z-index: 1;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 101, 132, 0.2);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FF6584;
    z-index: 2;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 101, 132, 0.3);
      transform: rotate(90deg);
    }
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const LinkButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &.primary {
    background: #6C63FF;
    color: white;

    &:hover {
      background: #5A52CC;
    }
  }

  &.secondary {
    background: transparent;
    border: 2px solid #6C63FF;
    color: #6C63FF;

    &:hover {
      background: rgba(108, 99, 255, 0.1);
    }
  }
`;

const ViewMoreButton = styled(motion.button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: #6C63FF;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(108, 99, 255, 0.1);
  }
`;

const ProjectCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        whileHover={{ y: -10 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        layout
      >
        <ImageContainer onClick={() => setIsOpen(true)}>
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            whileHover={{ scale: 1.1 }}
          />
        </ImageContainer>
        
        <CardContent>
          <Title>{project.title}</Title>
          <Description>{project.shortDescription}</Description>
          
          <TechTags>
            {project.technologies.slice(0, 3).map((tech, index) => (
              <Tag
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </Tag>
            ))}
            {project.technologies.length > 3 && (
              <Tag>+{project.technologies.length - 3}</Tag>
            )}
          </TechTags>

          <ViewMoreButton
            onClick={() => setIsOpen(true)}
            whileHover={{ x: 5 }}
          >
            View Details <FaArrowRight />
          </ViewMoreButton>
        </CardContent>
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>

              <div className="modal-header">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="modal-body">
                <Title>{project.title}</Title>
                <Description>{project.description}</Description>

                <TechTags>
                  {project.technologies.map((tech, index) => (
                    <Tag
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </Tag>
                  ))}
                </TechTags>

                <ProjectLinks>
                  {project.liveDemo && (
                    <LinkButton
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </LinkButton>
                  )}
                  {project.repo && (
                    <LinkButton
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub /> View Code
                    </LinkButton>
                  )}
                </ProjectLinks>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;