import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/SoujanyaBArakeri',
    icon: <FaGithub />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/soujanya-bheemappa-arakeri-6b5ba7263/',
    icon: <FaLinkedinIn />
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/Soujanya_a12/',
    icon: <SiLeetcode />
  },
  {
    name: 'Email',
    url: 'mailto:sbarakeri1112@gmail.com',
    icon: <FaEnvelope />
  }
];

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      linksRef.current.forEach((link, index) => {
        if (link) {
          gsap.from(link, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: 0.3 + index * 0.1,
            ease: 'back.out(1.7)'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="section-content">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's connect and create something amazing</p>
        </div>

        <div className="contact-content" ref={contentRef}>
          <p>
            I'm currently looking for new opportunities and my inbox is always open.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="contact-info">
            <div className="contact-info-item">
              <span className="icon"><FaEnvelope /></span>
              <span>sbarakeri1112@gmail.com</span>
            </div>
            <div className="contact-info-item">
              <span className="icon"><FaMapMarkerAlt /></span>
              <span>Bagalkote, Karnataka, India - 587103</span>
            </div>
          </div>

          <div className="contact-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="contact-link"
                title={link.name}
                ref={el => linksRef.current[index] = el}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <a
            href="mailto:sbarakeri1112@gmail.com"
            className="btn btn-primary"
          >
            <FaEnvelope />
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
}
