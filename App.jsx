import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import "./index.css";

const projects = [
  {
    number: "01",
    title: "MediNav AI",
    category: "AI / HEALTHCARE",
    description: "An AI-focused healthcare navigation concept built around a clean, intelligent digital experience.",
    tech: ["AI", "Python", "Streamlit"],
    link: "https://medinav-ai-c27fhpbypsnnrbaxnjumht.streamlit.app/",
    image: "/projects/medinav.svg",
  },
  {
    number: "02",
    title: "PathPilot AI",
    category: "AI / CAREER",
    description: "An AI product concept designed to help users navigate career decisions and discover a clearer path forward.",
    tech: ["AI", "Python", "React"],
    link: "https://pathpilot-ai-web-3fgerkzdfbzlfbkrgovygm.streamlit.app/",
    image: "/projects/pathpilot.svg",
  },
  {
    number: "03",
    title: "Havelio",
    category: "AI / INTERIOR DESIGN",
    description: "An AI interior and home-design platform focused on turning ideas into modern visual spaces.",
    tech: ["React", "Vite", "Supabase"],
    link: "https://havelio.vercel.app/",
    image: "/projects/havelio.svg",
  },
  {
    number: "04",
    title: "SPORTNEX",
    category: "SPORTS / NETWORK",
    description: "A sports ecosystem connecting athletes, coaches, scouts, clubs, academies and opportunities.",
    tech: ["React", "Web", "Platform"],
    link: "https://sport-career-link.lovable.app/",
    image: "/projects/sportnex.svg",
  },
  {
    number: "05",
    title: "Visora",
    category: "AI / PLATFORM",
    description: "A next-generation AI product concept currently being developed.",
    tech: ["AI", "Product", "Coming Soon"],
    link: null,
    image: "/projects/visora.svg",
  },
];

const skills = [
  ["01", "Python", "BACKEND / AI"],
  ["02", "React", "FRONTEND"],
  ["03", "JavaScript", "WEB"],
  ["04", "FastAPI", "BACKEND"],
  ["05", "SQL", "DATABASE"],
  ["06", "PostgreSQL", "DATABASE"],
  ["07", "GenAI", "ARTIFICIAL INTELLIGENCE"],
  ["08", "RAG", "AI SYSTEMS"],
  ["09", "AI Agents", "AGENTIC AI"],
  ["10", "Git / GitHub", "TOOLS"],
  ["11", "Docker", "DEPLOYMENT"],
  ["12", "Three.js", "3D WEB"],
];

function Scene() {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop="demand"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 5, 4]} intensity={2.5} />
        <pointLight position={[-4, -2, 2]} intensity={8} distance={10} />
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
          <mesh rotation={[0.25, 0.35, 0]}>
            <torusKnotGeometry args={[1.15, 0.12, 128, 24]} />
            <meshStandardMaterial
              color="#c9a45c"
              metalness={0.85}
              roughness={0.2}
              emissive="#4a3515"
              emissiveIntensity={0.35}
            />
          </mesh>
        </Float>
        <mesh position={[0, 0, -0.7]}>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial
            color="#101010"
            metalness={0.8}
            roughness={0.18}
            emissive="#17110a"
            emissiveIntensity={0.7}
          />
        </mesh>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const sectionIds = useMemo(
    () => ["home", "about", "projects", "skills", "experience", "contact"],
    []
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="portfolio">
      <div className="grain" />

      <header className="navbar">
        <button className="brand" onClick={() => goTo("home")} aria-label="Go home">
          <span>MSH</span>
          <small>PORTFOLIO</small>
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {sectionIds.map((id) => (
            <button
              key={id}
              className={active === id ? "active" : ""}
              onClick={() => goTo(id)}
            >
              {id}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="theme-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☼" : "◐"}
          </button>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow">FULL-STACK DEVELOPER & AI BUILDER</p>
              <h1>
                I TURN IDEAS
                <br />
                INTO <em>INTELLIGENT</em>
                <br />
                DIGITAL PRODUCTS.
              </h1>
              <p className="hero-text">
                I build modern web experiences, AI-powered products and
                practical digital systems with a strong focus on design,
                performance and usability.
              </p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => goTo("projects")}>
                  EXPLORE MY WORK <span>↗</span>
                </button>
                <button className="text-btn" onClick={() => goTo("contact")}>
                  LET&apos;S TALK
                </button>
              </div>
            </Reveal>
          </div>

          <Scene />

          <div className="hero-meta">
            <span>BASED IN INDIA</span>
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <button className="scroll-cue" onClick={() => goTo("about")}>
            SCROLL <span>↓</span>
          </button>
        </section>

        <section id="about" className="section about">
          <Reveal className="section-heading">
            <span className="section-number">01</span>
            <div>
              <p className="eyebrow">ABOUT ME</p>
              <h2>BUILDING WITH<br /><em>PURPOSE.</em></h2>
            </div>
          </Reveal>

          <div className="about-grid">
            <div className="portrait-card">
              <img src="/profile.jpg" alt="M. Sri Hari" />
              <div className="portrait-label">M. SRI HARI / 01</div>
            </div>

            <div className="about-copy">
              <p className="lead">
                I&apos;m <strong>M. Sri Hari</strong>, a full-stack developer
                and AI builder who enjoys turning ideas into products people
                can actually use.
              </p>
              <p>
                My work sits at the intersection of web development, artificial
                intelligence and visual product design. I like clean interfaces,
                thoughtful interactions and systems that solve real problems.
              </p>

              <div className="about-facts">
                <div><span>01</span><b>FULL-STACK</b><small>React / Python / APIs</small></div>
                <div><span>02</span><b>AI BUILDER</b><small>GenAI / RAG / Agents</small></div>
                <div><span>03</span><b>PRODUCT MINDSET</b><small>Design / UX / Systems</small></div>
              </div>
            </div>

            <div className="fullbody-card">
              <img src="/profile-full.jpg" alt="M. Sri Hari in a suit" />
              <div className="vertical-label">CREATIVE × TECHNICAL</div>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects">
          <Reveal className="section-heading">
            <span className="section-number">02</span>
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>PROJECTS THAT<br /><em>MATTER.</em></h2>
            </div>
          </Reveal>

          <div className="projects-list">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-top">
                  <span className="project-number">{project.number}</span>
                  <span className="project-category">{project.category}</span>
                </div>

                <div className="project-visual">
                  <img src={project.image} alt={`${project.title} concept visual`} />
                  <div className="visual-overlay" />
                </div>

                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-row">
                    {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                  {project.link ? (
                    <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                      VIEW LIVE <span>↗</span>
                    </a>
                  ) : (
                    <span className="project-link coming">COMING SOON <span>•</span></span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section skills">
          <Reveal className="section-heading">
            <span className="section-number">03</span>
            <div>
              <p className="eyebrow">THE STACK</p>
              <h2>TOOLS FOR<br /><em>BUILDING.</em></h2>
            </div>
          </Reveal>

          <div className="skills-stage">
            <div className="skills-core">
              <span>FULL-STACK</span>
              <strong>+</strong>
              <span>AI</span>
            </div>
            <div className="skills-orbit orbit-one" />
            <div className="skills-orbit orbit-two" />
          </div>

          <div className="skills-grid">
            {skills.map(([num, name, type]) => (
              <div className="skill" key={name}>
                <span>{num}</span>
                <b>{name}</b>
                <small>{type}</small>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience">
          <Reveal className="section-heading">
            <span className="section-number">04</span>
            <div>
              <p className="eyebrow">MY JOURNEY</p>
              <h2>LEARN.<br /><em>BUILD. EVOLVE.</em></h2>
            </div>
          </Reveal>

          <div className="timeline">
            <div className="timeline-line" />
            <article>
              <span className="year">2024</span>
              <div className="dot" />
              <div>
                <p className="eyebrow">START</p>
                <h3>FOUNDATIONS</h3>
                <p>Programming, Python, web fundamentals, SQL and the first steps into software development.</p>
              </div>
            </article>
            <article>
              <span className="year">2025</span>
              <div className="dot" />
              <div>
                <p className="eyebrow">BUILD</p>
                <h3>REAL PROJECTS</h3>
                <p>Moving from tutorials to practical products with React, APIs, databases and AI-powered features.</p>
              </div>
            </article>
            <article>
              <span className="year">2026</span>
              <div className="dot" />
              <div>
                <p className="eyebrow">CREATE</p>
                <h3>AI × FULL-STACK</h3>
                <p>Building intelligent digital products and exploring the intersection of AI, product design and 3D web experiences.</p>
              </div>
            </article>
            <article className="timeline-future">
              <span className="year">NEXT</span>
              <div className="dot" />
              <div>
                <p className="eyebrow">THE FUTURE</p>
                <h3>BUILD SOMETHING EXTRAORDINARY</h3>
                <p>Keep learning, keep shipping and turn bigger ideas into useful products.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-inner">
            <p className="eyebrow">HAVE AN IDEA?</p>
            <h2>LET&apos;S<br /><em>BUILD IT.</em></h2>
            <p className="contact-text">
              Have a project, product idea or collaboration in mind?
              Let&apos;s turn it into something remarkable.
            </p>

            <div className="contact-actions">
              <a className="primary-btn" href="mailto:sriharimadineni07@gmail.com">
                LET&apos;S TALK <span>↗</span>
              </a>
              <a
                className="linkedin-btn"
                href="https://www.linkedin.com/in/madineni-sri-hari-a36a1037b"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN <span>↗</span>
              </a>
            </div>
          </div>

          <footer>
            <div>
              <strong>M. SRI HARI</strong>
              <span>FULL-STACK DEVELOPER & AI BUILDER</span>
            </div>
            <div>
              <span>© 2026 M. SRI HARI</span>
              <span>BUILT WITH REACT × THREE.JS × AI</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
