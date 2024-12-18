// src/App.jsx
import React, { Suspense, lazy } from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const AppContainer = styled.div`
  overflow-x: hidden;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <Home />
      <Projects />
      <Skills />
      <Testimonials />
      <Footer />
    </AppContainer>
  );
}

export default App;
