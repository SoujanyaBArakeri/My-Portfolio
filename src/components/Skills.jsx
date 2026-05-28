import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaPalette, FaDatabase, FaPencilRuler, FaCloud, FaVial } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <FaCode />,
    skills: ['C', 'Python']
  },
  {
    title: 'Front-end Technologies',
    icon: <FaPalette />,
    skills: ['HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Database',
    icon: <FaDatabase />,
    skills: ['SQL']
  },
  {
    title: 'Design Tools',
    icon: <FaPencilRuler />,
    skills: ['Figma', 'Canva']
  },
  {
    title: 'Cloud',
    icon: <FaCloud />,
    skills: ['AWS (Basic)']
  },
  {
    title: 'Testing Tools',
    icon: <FaVial />,
    skills: ['Swagger', 'Postman']
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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
          delay: index * 0.1,
          ease: 'power3.out'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category"
              ref={el => cardsRef.current[index] = el}
            >
              <h3>
                <span className="icon">{category.icon}</span>
                {category.title}
              </h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
