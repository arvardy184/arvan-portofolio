// src/components/Projects.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projectsData';

const ProjectsSection = styled.section`
  padding: 80px 20px;
  background: #2E2E3A;
  text-align: center;
  position: relative;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 60px;
    background: linear-gradient(90deg, #6C63FF, #FF6584);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    padding: 0 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const Projects = () => {
  return (
    <ProjectsSection id="projects">
      <h2>Proyek Saya</h2>
      <motion.div
        className="projects-grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </ProjectsSection>
  );
};

export default Projects;
