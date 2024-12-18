// src/components/Testimonials.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import testimonialsData from '../data/testimonialsData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialsSection = styled.section`
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

  .carousel {
    position: relative;
    max-width: 700px;
    margin: 0 auto;
    overflow: hidden;
    background: #1A1A2E;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
  }

  .testimonial {
    position: absolute;
    width: 100%;
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
  }

  .testimonial.active {
    opacity: 1;
    position: relative;
    transform: translateX(0);
  }

  p {
    font-size: 1.2rem;
    color: #EAEAEA;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 1rem;
    color: #6C63FF;
  }

  .nav-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    button {
      background: none;
      border: none;
      color: #6C63FF;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #FF6584;
      }
    }
  }
`;

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonialsData.length;

  const nextSlide = () => {
    setCurrent(current === length -1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length -1 : current -1);
  };

  return (
    <TestimonialsSection id="testimonials">
      <h2>Testimoni</h2>
      <div className="carousel">
        <AnimatePresence>
          {testimonialsData.map((testimonial, index) => (
            index === current && (
              <motion.div
                key={testimonial.id}
                className={`testimonial ${index === current ? 'active' : ''}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <p>"{testimonial.message}"</p>
                <h4>- {testimonial.author}</h4>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        <div className="nav-buttons">
          <button onClick={prevSlide}><FaChevronLeft /></button>
          <button onClick={nextSlide}><FaChevronRight /></button>
        </div>
      </div>
    </TestimonialsSection>
  );
};

export default Testimonials;
