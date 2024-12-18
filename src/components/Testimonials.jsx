// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import testimonialsData from '../data/testimonialsData';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const TestimonialsSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(180deg, #1A1A2E 0%, #2E2E3A 100%);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(108, 99, 255, 0.1) 0%, transparent 50%);
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

const CarouselContainer = styled(motion.div)`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const Carousel = styled.div`
  position: relative;
  padding: 60px 40px;
  border-radius: 20px;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
      rgba(108, 99, 255, 0.3) 50%,
      transparent 100%
    );
  }
`;

const TestimonialCard = styled(motion.div)`
  padding: 20px;
  position: relative;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -30px;
  right: 40px;
  font-size: 5rem;
  color: rgba(108, 99, 255, 0.1);
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Set the current slide to the previous one.
   * If the current slide is at the beginning (0), set it to the last slide.
   */
/******  a63d4854-6fc6-47dc-a80b-7080528da5d8  *******/  transform: rotate(10deg);
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #EAEAEA;
  margin-bottom: 30px;
  line-height: 1.8;
  position: relative;
  z-index: 1;
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const AuthorImage = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #6C63FF;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  color: #6C63FF;
  margin: 0;
`;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  color: rgba(234, 234, 234, 0.6);
  margin: 0;
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(108, 99, 255, 0.1);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6C63FF;
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &.prev {
    left: -25px;
  }

  &.next {
    right: -25px;
  }

  &:hover {
    background: rgba(108, 99, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    &.prev { left: -10px; }
    &.next { right: -10px; }
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const Dot = styled(motion.button)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#6C63FF' : 'rgba(108, 99, 255, 0.3)'};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#6C63FF' : 'rgba(108, 99, 255, 0.5)'};
    transform: scale(1.2);
  }
`;

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const length = testimonialsData.length;

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [current, length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <TestimonialsSection id="testimonials">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Testimoni
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Apa yang klien katakan tentang hasil kerja dan kolaborasi dengan saya
      </Subtitle>

      <CarouselContainer
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Carousel>
          <AnimatePresence initial={false} custom={direction}>
            {testimonialsData.map((testimonial, index) => (
              index === current && (
                <TestimonialCard
                  key={testimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <QuoteIcon>
                    <FaQuoteRight />
                  </QuoteIcon>
                  <Message>"{testimonial.message}"</Message>
                  <Author>
                    <AuthorImage
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <img src={testimonial.image || "/api/placeholder/60/60"} alt={testimonial.author} />
                    </AuthorImage>
                    <AuthorName>{testimonial.author}</AuthorName>
                    <AuthorTitle>{testimonial.title}</AuthorTitle>
                  </Author>
                </TestimonialCard>
              )
            ))}
          </AnimatePresence>

          <NavButton
            className="prev"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </NavButton>

          <NavButton
            className="next"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </NavButton>
        </Carousel>

        <Dots>
          {testimonialsData.map((_, index) => (
            <Dot
              key={index}
              active={index === current}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </Dots>
      </CarouselContainer>
    </TestimonialsSection>
  );
};

export default Testimonials;