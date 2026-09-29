import './App.css'

function App() {
  const scrollToExperience = (e) => {
    e.preventDefault();
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Cristiano Fazi</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section id="about" className="hero-section">
          <div className="hero-image-container">
            <div className="image-placeholder">
              <span>Image Placeholder</span>
            </div>
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
