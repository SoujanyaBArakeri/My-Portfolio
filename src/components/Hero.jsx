import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaFileAlt, FaComments } from 'react-icons/fa';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([greetingRef.current, nameRef.current, taglineRef.current, buttonsRef.current], {
        y: 50,
        opacity: 0
      });
      gsap.set(scrollRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 1.8 });

      tl.to(greetingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .to(scrollRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.2');

      gsap.to(nameRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 3
      });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(containerRef.current, {
          x: x,
          y: y,
          duration: 1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home">
      <ParticleBackground />

      <div className="hero-content" ref={containerRef}>
        <p ref={greetingRef} className="hero-greeting">
          Hello, I'm
        </p>

        <h1 ref={nameRef} className="hero-name">
          Soujanya Bheemappa Arakeri
        </h1>

        <p ref={taglineRef} className="hero-tagline">
          Pursuing M.Tech at KLE Technological University with a passion for web development, software testing, and cloud security.
        </p>

        <div ref={buttonsRef} className="hero-buttons">
          <a
            href="https://drive.google.com/file/d/1VJl2lw7Us4XTIps2pCeonTxZtN884FGO/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FaFileAlt />
            View Resume
          </a>
          <a href="#contact" className="btn btn-secondary">
            <FaComments />
            Get In Touch
          </a>
        </div>
      </div>

      <div ref={scrollRef} className="scroll-indicator">
        <div className="mouse"></div>
        <span>Scroll Down</span>
      </div>

      <style>{`
        .hero {
          background: linear-gradient(135deg,
            var(--bg-primary) 0%,
            var(--bg-secondary) 50%,
            var(--bg-primary) 100%
          );
        }

        [data-theme="dark"] .hero {
          background: linear-gradient(135deg,
            #0f172a 0%,
            #1e1b4b 30%,
            #0f172a 70%,
            #1e293b 100%
          );
        }

        .hero-greeting {
          font-size: 1.3rem;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-name {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .hero-tagline {
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
          color: var(--text-secondary);
          max-width: 650px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
        }

        .btn-secondary:hover {
          transform: translateY(-3px);
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
      `}</style>
    </section>
  );
}
