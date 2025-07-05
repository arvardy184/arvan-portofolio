import React from 'react';

// Komponen yang sudah kita buat
import TailwindNavbar from './components/TailwindNavbar';
import CustomHero from './components/CustomHero';
import CustomSkills from './components/CustomSkills';
import TailwindProjects from './components/TailwindProjects';
import TailwindTestimonials from './components/TailwindTestimonials';
import TailwindContact from './components/TailwindContact';
import TailwindFooter from './components/TailwindFooter';

function App() {
  return (
    <div className="font-sans bg-washi-cream text-stone-900 min-h-screen washi-bg">
      <TailwindNavbar />
      <CustomHero />
      <TailwindProjects />
      <CustomSkills />
      <TailwindTestimonials />
      <TailwindContact />
      <TailwindFooter />
    </div>
  );
}

export default App;
