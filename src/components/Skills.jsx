// src/components/Skills.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import skillsData from '../data/skillsData';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaCss3Alt } from 'react-icons/fa';

const SkillsSection = styled.section`
  padding: 80px 20px;
  background: #1A1A2E;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 60px;
    background: linear-gradient(90deg, #6C63FF, #FF6584);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
  }

  .skill-item {
    background: #2E2E3A;
    padding: 20px;
    border-radius: 15px;
    width: 250px;
    position: relative;
    box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(108, 99, 255, 0.3);
    }

    .icon {
      font-size: 3rem;
      color: #6C63FF;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: #EAEAEA;
    }

    .skill-bar {
      background: #6C63FF;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .skill-progress {
      background: #FF6584;
      height: 100%;
      width: 0;
    }
  }

  @media (max-width: 768px) {
    .skills-container {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Skills = () => {
  const getIcon = (name) => {
    switch(name) {
      case 'React JS':
        return <FaReact />;
      case 'Node.js':
        return <FaNodeJs />;
      case 'MongoDB':
        return <FaDatabase />;
      case 'Git':
        return <FaGitAlt />;
      case 'CSS3':
        return <FaCss3Alt />;
      default:
        return <FaReact />;
    }
  }

  return (
    <SkillsSection id="skills">
      <h2>Keahlian dan Tools</h2>
      <div className="skills-container">
        {skillsData.map(skill => (
          <motion.div
            key={skill.id}
            className="skill-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="icon">{getIcon(skill.name)}</div>
            <h3>{skill.name}</h3>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </SkillsSection>
  );
};

export default Skills;
