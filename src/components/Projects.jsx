// src/components/Projects.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projectsData';


const ProjectsSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(180deg, #2E2E3A 0%, #1A1A2E 100%);
  text-align: center;
  position: relative;
  overflow: hidden;

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

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #6C63FF, #FF6584);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const Subtitle = styled(motion.p)`
  color: #EAEAEA;
  max-width: 600px;
  margin: 0 auto 60px;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const FiltersContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 8px 20px;
  border: 2px solid ${props => props.active ? '#6C63FF' : 'rgba(108, 99, 255, 0.3)'};
  background: ${props => props.active ? 'rgba(108, 99, 255, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#6C63FF' : '#EAEAEA'};
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #6C63FF;
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const LoadMoreButton = styled(motion.button)`
  margin-top: 50px;
  padding: 12px 30px;
  background: transparent;
  border: 2px solid #6C63FF;
  color: #6C63FF;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(108, 99, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filters = ['all', 'web', 'mobile', 'design'];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };

  return (
    <ProjectsSection id="projects">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Proyek Saya
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Kumpulan proyek terbaik yang telah saya kerjakan menggunakan berbagai teknologi modern
      </Subtitle>

      <FiltersContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </FilterButton>
        ))}
      </FiltersContainer>

      <ProjectsGrid
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {filteredProjects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            index={index}
          />
        ))}
      </ProjectsGrid>

      {visibleProjects < filteredProjects.length && (
        <LoadMoreButton
          onClick={loadMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Load More
        </LoadMoreButton>
      )}
    </ProjectsSection>
  );
};

export default Projects;