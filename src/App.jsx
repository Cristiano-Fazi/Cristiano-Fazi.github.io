import { useState } from 'react';
import './App.css'
import yanoImg from '../images/Yano_on_terasse.jpg'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);

    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);

          const ease = progress < 0.5
            ? 8 * progress * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 4) / 2;

          window.scrollTo(0, startPosition + distance * ease);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    }, 50);
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
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>Experience</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
        </div>
      </nav>

      <main>
        <section id="about" className="hero-section">
          <div className="hero-image-container">
            <img src={yanoImg} alt="Cristiano Fazi" className="hero-image" />
          </div>
          <div className="hero-content">
            <h1>Junior <br /> Software Engineer</h1>
            <p>
              I’m a software engineering student at Concordia and I’m looking to contribute to big projects
            </p>
            <div className="btn-wrapper">
              <button className="see-work-btn" onClick={(e) => scrollToSection(e, 'experience')}>See my work</button>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <h2>Experience</h2>

          <div className="timeline">
            {/* Matrox */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-item-body">
                <div className="timeline-content">
                  <span className="timeline-date">May 2026 – Present</span>
                  <h3>Software Quality Assurance Intern</h3>
                  <h4>Matrox, Montreal, Quebec</h4>
                  <ul>
                    <li>Rigorously tested software, uncovering and creating tickets for many bugs</li>
                    <li>Developed and maintained internal tools for quality assurance team</li>
                    <li>Created software for automated testing of APIs</li>
                  </ul>
                  <div className="tech-tags">
                    <span>Python</span>
                    <span>Testing</span>
                    <span>Jira</span>
                  </div>
                </div>
                <div className="timeline-logo">
                  <img src="images/company-icons/matrox_logo.webp" alt="Matrox Logo" />
                </div>
              </div>
            </div>

            {/* CAE */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-item-body">
                <div className="timeline-content">
                  <span className="timeline-date">June 2023 – August 2024</span>
                  <h3>Software Developer Intern</h3>
                  <h4>CAE, Montreal, Quebec</h4>
                  <ul>
                    <li>Maintained internal tools using Angular, Python and Cosmos DB</li>
                    <li>Worked on software to constantly monitor the status of all civil aviation simulators</li>
                    <li>Helped migrate data services from SQL to Cosmos DB (NoSQL)</li>
                    <li>Worked on deployment pipelines to automate builds and releases</li>
                  </ul>
                  <div className="tech-tags">
                    <span>Python</span>
                    <span>Angular</span>
                    <span>C#</span>
                    <span>YAML</span>
                  </div>
                </div>
                <div className="timeline-logo">
                  <img src="images/company-icons/CAE_logo.webp" alt="CAE Logo" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
