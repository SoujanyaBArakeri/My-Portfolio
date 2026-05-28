import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaMapMarkerAlt, FaEnvelope, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const infoRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      infoRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
            x: index % 2 === 0 ? -30 : 30,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-alt" id="about" ref={sectionRef}>
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>

        <div className="about-content-centered">
          <div className="about-text-full" ref={textRef}>
            <h3>Computer Science Student & Aspiring Developer</h3>
            <p>
              As a Computer Science student, I aim to leverage my skills in Python development,
              software testing, AWS, and problem-solving to contribute to innovative and impactful projects.
              I am passionate about continuous learning and strive to grow in dynamic, collaborative
              environments while delivering efficient and reliable solutions.
            </p>
            <p>
              Currently pursuing M.Tech at KLE Technological University, I have hands-on experience
              with web technologies, cloud platforms, and software testing tools. I believe in
              writing clean, maintainable code and building solutions that make a difference.
            </p>

            <div className="about-info-grid">
              <div className="about-info-item" ref={el => infoRef.current[0] = el}>
                <div className="icon"><FaMapMarkerAlt /></div>
                <div>
                  <div className="label">Location</div>
                  <div className="value">Bagalkote, Karnataka</div>
                </div>
              </div>
              <div className="about-info-item" ref={el => infoRef.current[1] = el}>
                <div className="icon"><FaEnvelope /></div>
                <div>
                  <div className="label">Email</div>
                  <div className="value">sbarakeri1112@gmail.com</div>
                </div>
              </div>
              <div className="about-info-item" ref={el => infoRef.current[2] = el}>
                <div className="icon"><FaGraduationCap /></div>
                <div>
                  <div className="label">Education</div>
                  <div className="value">M.Tech (Ongoing)</div>
                </div>
              </div>
              <div className="about-info-item" ref={el => infoRef.current[3] = el}>
                <div className="icon"><FaBriefcase /></div>
                <div>
                  <div className="label">Focus Area</div>
                  <div className="value">Web Dev & Cloud Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-content-centered {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .about-text-full h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-text-full p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          line-height: 1.8;
          text-align: justify;
        }

        .about-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .about-info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-card);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          text-align: left;
          transition: var(--transition);
        }

        .about-info-item:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .about-info-item .icon {
          width: 45px;
          height: 45px;
          background: var(--bg-secondary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: var(--primary);
        }

        .about-info-item .label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .about-info-item .value {
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (max-width: 600px) {
          .about-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
