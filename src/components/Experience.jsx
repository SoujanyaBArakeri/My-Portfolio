import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheckCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.set(cardRef.current, { opacity: 0, y: 50 });

        gsap.to(cardRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.set(item, { opacity: 0, x: -30 });

          gsap.to(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.15,
            ease: 'power3.out'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const responsibilities = [
    'Focused on software testing by validating APIs using Swagger, identifying bugs, and creating detailed test cases to ensure quality and reliability',
    'Designed a user-focused website for Vealthx using Figma for prototyping',
    'Developed the website using React.js to enhance functionality, responsiveness, and user experience'
  ];

  return (
    <section className="section" id="experience" ref={sectionRef}>
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>

        <div className="experience-card" ref={cardRef}>
          <div className="experience-header">
            <div>
              <h3 className="company">Vealthx</h3>
              <p className="role">Intern - Software Testing & Web Development</p>
            </div>
            <span className="experience-badge">Fintech</span>
          </div>

          <ul className="experience-responsibilities">
            {responsibilities.map((resp, index) => (
              <li key={index} ref={el => itemsRef.current[index] = el}>
                <FaCheckCircle className="check-icon" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .experience-responsibilities li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          color: var(--text-secondary);
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
        }

        .experience-responsibilities li:last-child {
          border-bottom: none;
        }

        .check-icon {
          color: var(--primary);
          font-size: 1.1rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
