import { useState, useEffect } from 'react';
import './App.css'
import yanoImg from '../images/Yano_on_terasse.jpg'
import matroxImg from '../images/company-icons/matrox_logo.webp'
import caeImg from '../images/company-icons/CAE_logo.webp'
import concordiaImg from '../images/company-icons/concordia-university-logo.png'
import johnAbbottImg from '../images/company-icons/John-Abbott-logo.jpg'
import cropCareImg from '../images/cropcare.png'
import TradeMindImg from '../images/favicon.ico'
import AILaunchLab from '../images/company-icons/ai-launch-lab.webp'

import linkedinIcon from '../images/linkedin-icon.png'
import githubIcon from '../images/Github-logo.png'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Force the browser to start at the top on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
          <a href="#education" onClick={(e) => scrollToSection(e, 'education')}>Education</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
        </div>
      </nav>

      <main>
        <section id="about" className="hero-section">
          <div className="hero-image-container">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={yanoImg} alt="Cristiano Fazi" className="hero-image" />
                </div>
                <div className="flip-card-back">
                  <p>Hi, I'm Cristiano! I love coding, designing, and bringing creative ideas to life. This is the back of my card!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-content">
            <h1>Junior <br /> Software Engineer</h1>
            <p>
              I’m a Software Engineering student at Concordia and I’m looking to contribute to big projects.
            </p>
            <div className="btn-wrapper">
              <button className="see-work-btn" onClick={(e) => scrollToSection(e, 'experience')}>See my work</button>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <h2 className="scroll-animate">Work Experience</h2>

          <div className="timeline">
            {/* Matrox */}
            <div className="timeline-item scroll-animate">
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
                  <img src={matroxImg} alt="Matrox Logo" />
                </div>
              </div>
            </div>

            {/* CAE */}
            <div className="timeline-item scroll-animate">
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
                  <img src={caeImg} alt="CAE Logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="experience-section">
          <h2 className="scroll-animate">Education</h2>

          <div className="timeline">
            {/* Concordia */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-dot"></div>
              <div className="timeline-item-body">
                <div className="timeline-content">
                  <span className="timeline-date">August 2024 – May 2028 (Expected)</span>
                  <h3>Bachelor of Engineering – Software Engineering</h3>
                  <h4>Concordia University, Montreal, QC</h4>
                  <ul>
                    <li>Participated multiple times in school run hackathon ConUHacks</li>
                    <li>Relevant courses: Data Structures and Algorithms, Operating Systems, System Hardware</li>
                    <li>GPA: 3.74</li>
                  </ul>
                </div>
                <div className="timeline-logo">
                  <img src={concordiaImg} alt="Concordia Logo" />
                </div>
              </div>
            </div>

            {/* John Abbott */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-dot"></div>
              <div className="timeline-item-body">
                <div className="timeline-content">
                  <span className="timeline-date">August 2021 – May 2024</span>
                  <h3>DEC – Computer Science</h3>
                  <h4>John Abbott College, Sainte-Anne-de-Bellevue, QC</h4>
                  <ul>
                    <li>Achieved top project scores, exceeding 100%, in multiple courses</li>
                    <li>Dean’s List Recipient for Academic Achievement</li>
                    <li>Received the CAE Tech program scholarship</li>
                  </ul>
                </div>
                <div className="timeline-logo">
                  <img src={johnAbbottImg} alt="John Abbott Logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="experience-section">
          <h2 className="scroll-animate">Projects</h2>

          <div className="timeline">
            {/* CropCare */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-dot"></div>
              <div className="timeline-item-body">
                <div className="timeline-content">
                  <span className="timeline-date">April 2024 - May 2024</span>
                  <h3>CropCare</h3>
                  <h4>Multidisciplinary Final Project for Cegep</h4>
                  <ul>
                    <li>Worked on cross platform mobile app to remotely access and control both servos and sensors</li>
                    <li>Used azure to store data in the cloud</li>
                    <li>Built multiple scale models as proof od concepts</li>
                  </ul>
                  <div className="tech-tags">
                    <span>.NET MAUI</span>
                    <span>Python</span>
                    <span>Azure IoT Hub</span>
                  </div>
                </div>
                <div className="timeline-logo">
                  <img src={cropCareImg} alt="CropCare Logo" />
                </div>
              </div>
            </div>

            {/* TradeMind */}
            <div className="timeline-item scroll-animate">
              <div className="timeline-dot"></div>
              <div className="timeline-item-body">
                <div className="timeline-content">
                  <span className="timeline-date">January 2024 - May 2024</span>
                  <h3>TradeMind</h3>
                  <h4>AI Stock Market Prediction Model</h4>
                  <ul>
                    <li> Final project for 10 Week AI Launch Lab course</li>
                    <li> Used a linear regression model to predict stock price based on historic data</li>
                    <li> Developed web application with React to display results graphically</li>
                  </ul>
                  <div className="tech-tags">
                    <span>React</span>
                    <span>AI</span>
                  </div>
                </div>
                <div className="timeline-logo">
                  {/* You can replace this inline style with an actual project image later */}
                  <img src={AILaunchLab} alt="AI Launch Lab Logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section scroll-animate">
          <h2>Let's Connect</h2>
          <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>

          <div className="contact-links">
            <a href="mailto:cristianofazi03@gmail.com" className="contact-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/cristiano-fazi-b21584208" target="_blank" rel="noreferrer" className="contact-card">
              <img src={linkedinIcon} alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/Cristiano-Fazi" target="_blank" rel="noreferrer" className="contact-card">
              <img src={githubIcon} alt="GitHub" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
