import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Cloud Web Security using AWS and WAF',
    description: 'Designed and deployed a secure and scalable web application using AWS EC2, Application Load Balancer, and AWS WAF.',
    features: [
      'Configured WAF rules to filter incoming traffic by blocking, allowing, and applying CAPTCHA based on IP addresses',
      'Integrated ALB to efficiently distribute traffic and ensure high availability of the application',
      'Improved application-layer security by preventing unauthorized access and controlling web requests'
    ],
    tech: ['AWS EC2', 'Application Load Balancer', 'AWS WAF'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
    github: 'https://github.com/SoujanyaBArakeri/Cloud-Web-Security-using-AWS-WAF'
  },
  {
    title: 'Intelligent 5G Resource Management using Machine Learning',
    description: 'Developed a 5G network slicing system with role-based access control for automated resource allocation.',
    features: [
      'Implemented network simulation and a machine learning model to optimize transmission power',
      'Built using Flask, MySQL, HTML, CSS, and JavaScript to improve network efficiency and Quality of Service'
    ],
    tech: ['Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    github: 'https://github.com/SoujanyaBArakeri/Intelligent-5G-Resource-Management-using-Machine-Learning'
  }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 60 });

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="section section-alt" id="projects" ref={sectionRef}>
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Some things I've built</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay"></div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <ul className="project-features">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>

                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .project-image {
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
