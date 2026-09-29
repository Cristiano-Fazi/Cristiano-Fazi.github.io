import { useState } from 'react';
import './App.css'
import yanoImg from '../images/Yano_on_terasse.jpg'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToExperience = (e) => {
    e.preventDefault();
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Cristiano Fazi</div>
        
        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      <main>
        <section id="about" className="hero-section">
          <div className="hero-image-container">
            <img src={yanoImg} alt="Cristiano Fazi" className="hero-image" />
          </div>
          <div className="hero-content">
            <h1>Junior Software Engineer</h1>
            <p>
              I’m a software engineering student at Concordia and I’m looking to contribute to big projects
            </p>
            <button className="see-work-btn" onClick={scrollToExperience}>See my work</button>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <h2>Experience</h2>
          <p>Overview of my Professional Roles</p>
        </section>
      </main>
    </div>
  )
}

export default App
