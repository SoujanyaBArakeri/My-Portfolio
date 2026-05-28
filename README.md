# Soujanya Arakeri - Portfolio Website

A modern, professional portfolio website built with React, Three.js for 3D effects, and GSAP for smooth animations.

## Live Demo

[View Portfolio](https://portfolio-zeta-ten-88.vercel.app/)

## Features

- **3D Animated Background** - Interactive particle system using Three.js
- **Smooth Animations** - GSAP-powered scroll animations and transitions
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Fully Responsive** - Mobile-first design that works on all devices
- **Modern UI** - Clean, minimal, and professional design

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: GSAP with ScrollTrigger
- **Icons**: React Icons
- **Styling**: CSS3 with CSS Variables

## Sections

1. **Hero** - Animated intro with 3D particle background
2. **About** - Personal summary and quick info cards
3. **Skills** - Technical skills organized by category
4. **Projects** - Featured projects with descriptions and links
5. **Experience** - Professional internship details
6. **Education** - Academic background and certifications
7. **Contact** - Social links and contact information

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/SoujanyaBArakeri/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Personal Information

Edit the following files to update personal information:

- `src/components/Hero.jsx` - Name, tagline, resume link
- `src/components/About.jsx` - Summary and info cards
- `src/components/Contact.jsx` - Social links and email
- `src/components/Projects.jsx` - Project details and GitHub links
- `src/components/Experience.jsx` - Work experience
- `src/components/Education.jsx` - Education and certifications
- `src/components/Skills.jsx` - Technical skills

### Theme Colors

Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;
  --secondary: #8b5cf6;
  --accent: #06b6d4;
}
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with default settings

### Netlify

1. Push code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## Contact

**Soujanya Bheemappa Arakeri**

- Email: sbarakeri1112@gmail.com
- LinkedIn: [soujanya-bheemappa-arakeri](https://www.linkedin.com/in/soujanya-bheemappa-arakeri-6b5ba7263/)
- GitHub: [SoujanyaBArakeri](https://github.com/SoujanyaBArakeri)
- LeetCode: [Soujanya_a12](https://leetcode.com/u/Soujanya_a12/)

## License

This project is open source and available under the [MIT License](LICENSE).
