// src/components/Skills.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import skillsData from '../data/skillsData';
import { 
  FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaCss3Alt,
  FaTools, FaCode, FaLaptopCode
} from 'react-icons/fa';

const SkillsSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(180deg, #1A1A2E 0%, #2E2E3A 100%);
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
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

const Categories = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const CategoryButton = styled(motion.button)`
  padding: 10px 20px;
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

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const SkillCard = styled(motion.div)`
  background: rgba(46, 46, 58, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #6C63FF, #FF6584);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 3rem;
  color: #6C63FF;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background: rgba(108, 99, 255, 0.1);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  color: #EAEAEA;
  margin-bottom: 15px;
`;

const SkillDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(234, 234, 234, 0.8);
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #6C63FF, #FF6584);
  border-radius: 3px;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  color: #EAEAEA;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills', icon: FaCode },
    { id: 'frontend', label: 'Frontend', icon: FaLaptopCode },
    { id: 'backend', label: 'Backend', icon: FaDatabase },
    { id: 'tools', label: 'Tools & Others', icon: FaTools }
  ];

  const getIcon = (name) => {
    switch(name.toLowerCase()) {
      case 'react':
        return <FaReact />;
      case 'node.js':
        return <FaNodeJs />;
      case 'mongodb':
        return <FaDatabase />;
      case 'git':
        return <FaGitAlt />;
      case 'css':
        return <FaCss3Alt />;
      default:
        return <FaCode />;
    }
  };

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <SkillsSection id="skills">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Keahlian dan Tools
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Teknologi dan tools yang saya kuasai untuk menciptakan solusi digital yang inovatif
        </Subtitle>

        <Categories>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </CategoryButton>
          ))}
        </Categories>

        <SkillsGrid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 30px rgba(108, 99, 255, 0.2)'
                }}
              >
                <IconWrapper
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getIcon(skill.name)}
                </IconWrapper>
                
                <SkillTitle>{skill.name}</SkillTitle>
                <SkillDescription>{skill.description}</SkillDescription>
                
                <ProgressBar>
                  <Progress
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </ProgressBar>
                
                <ProgressLabel>
                  <span>Proficiency</span>
                  <span>{skill.proficiency}%</span>
                </ProgressLabel>
              </SkillCard>
            ))}
          </AnimatePresence>
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;