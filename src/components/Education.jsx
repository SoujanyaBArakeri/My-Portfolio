import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaBook, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Master of Technology',
    field: 'Computer Science',
    institution: 'KLE Technological University, Hubballi',
    duration: '2025 - 2026',
    icon: <FaGraduationCap />
  },
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science',
    institution: 'Basaveshwar Engineering College, Bagalkote',
    duration: '2021 - 2025',
    icon: <FaBook />
  }
];

export default function Education() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const certRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 50 });

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2,
          ease: 'power3.out'
        });
      }
    });

    if (certRef.current) {
      gsap.set(certRef.current, { opacity: 0, scale: 0.9 });

      gsap.to(certRef.current, {
        scrollTrigger: {
          trigger: certRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="section section-alt" id="education" ref={sectionRef}>
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic background</p>
        </div>

        <div className="education-grid">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="education-card"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="education-icon">{edu.icon}</div>
              <h3>{edu.degree}</h3>
              {edu.field && <p className="field">{edu.field}</p>}
              <p className="institution">{edu.institution}</p>
              <p className="duration">
                <FaCalendarAlt />
                {edu.duration}
              </p>
            </div>
          ))}
        </div>

        <div className="certifications" ref={certRef}>
          <h3>Certifications</h3>
          <div className="cert-badge">
            <div className="icon"><FaTrophy /></div>
            <div className="text">
              <div className="name">Python Certification</div>
              <div className="issuer">Spoken Tutorial, EduPyramids, SINE, IIT Bombay</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
