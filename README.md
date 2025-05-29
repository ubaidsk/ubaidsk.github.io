# 🚀 Modern Portfolio Website

A sleek, modern, and fully responsive portfolio website built with cutting-edge web technologies. Features dark/light theme toggle, smooth animations, and a professional design that showcases skills, projects, and professional experience.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## ✨ Features

### 🎨 Design & UI
- **Modern Glassmorphism Design** - Contemporary UI with backdrop filters and transparency effects
- **Gradient Text Effects** - Eye-catching gradient text with CSS background-clip
- **Responsive Layout** - Fully responsive design that works on all devices
- **Dark/Light Theme Toggle** - Seamless theme switching with localStorage persistence
- **Professional Typography** - Inter and Fira Code fonts from Google Fonts

### 🎭 Animations & Effects
- **Typing Animation** - Dynamic typewriter effect cycling through multiple roles
- **Scroll-based Animations** - Elements animate into view using Intersection Observer API
- **Floating Particles** - Interactive particle system with randomized animations
- **Hover Effects** - Smooth transitions and transforms on interactive elements
- **Progress Bars** - Animated skill progress indicators with staggered loading

### 🧩 Components
- **Hero Section** - Professional profile image with animated particles background
- **About Section** - Personal introduction with achievement statistics
- **Skills Section** - 8 core technical skills with animated progress bars
- **Projects Showcase** - 6 featured projects with live demos and GitHub links
- **Contact Form** - Functional contact form with success animations
- **Social Links** - 7 professional social media platforms

### 🛠️ Technical Features
- **Smooth Scrolling** - Native smooth scroll behavior for navigation
- **Intersection Observer** - Efficient scroll-based animations
- **CSS Variables** - Consistent theming with CSS custom properties
- **LocalStorage** - Theme preference persistence across sessions
- **SEO Optimized** - Proper meta tags and semantic HTML structure

## 🏗️ Built With

### Core Technologies
- **HTML5** - Semantic markup and modern structure
- **CSS3** - Advanced styling with custom properties, animations, and responsive design
- **Vanilla JavaScript** - ES6+ features, no frameworks for optimal performance

### External Libraries & Resources
- **[Bootstrap 5.3.2](https://getbootstrap.com/)** - Responsive grid system and utility classes
- **[Font Awesome 6.5.1](https://fontawesome.com/)** - Professional icon library
- **[Google Fonts](https://fonts.google.com/)** - Inter and Fira Code typography
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** - Additional UI icons

### Design System
- **Primary Color**: `#6366f1` (Indigo)
- **Secondary Color**: `#8b5cf6` (Purple)
- **Accent Color**: `#06b6d4` (Cyan)
- **Typography**: Inter (body), Fira Code (code)

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file with all components
├── img/
│   └── me.jpg          # Profile image
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. **Clone or download** the repository
2. **Place your profile image** in `img/me.jpg`
3. **Open `index.html`** in your browser or serve with a local server

### Local Development
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP (if installed)
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🎛️ Customization Guide

### Personal Information
Update the following sections in `index.html`:

#### 1. Header & Meta Tags
```html
<title>Your Name - Your Title</title>
```

#### 2. Hero Section
```html
<!-- Update name, typing animation texts, and description -->
<h1>Hi, I'm <span class="gradient-text">Your Name</span></h1>
<span id="typing-text">Your Role</span>
```

#### 3. About Section
```html
<!-- Update bio, achievements, and statistics -->
<p class="lead mb-4">Your personal introduction...</p>
```

#### 4. Skills Section
Update the 8 skill cards with your technologies:
```html
<h5 class="mb-3">Your Skill</h5>
<p class="mb-3">Your skill description</p>
<div class="skill-progress-bar" data-width="85"></div>
```

#### 5. Projects Section
Replace the 6 project cards with your work:
```html
<h5 class="card-title">Project Name</h5>
<p class="card-text">Project description...</p>
<a href="your-github-link">Code</a>
<a href="your-demo-link">Demo</a>
```

#### 6. Contact Information
```html
<!-- Update social links and contact details -->
<a href="https://github.com/yourusername">GitHub</a>
<a href="mailto:your@email.com">Email</a>
```

### Theme Customization
Modify CSS variables in the `:root` selector:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Adding New Sections
1. Create HTML structure following existing patterns
2. Add CSS styling matching the design system
3. Include `animate-on-scroll` class for animations
4. Update navigation if needed

## 🎨 Color Schemes

### Default (Current)
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#06b6d4` (Cyan)

### Alternative Suggestions
```css
/* Blue Theme */
--primary-color: #3b82f6;
--secondary-color: #1d4ed8;
--accent-color: #06b6d4;

/* Green Theme */
--primary-color: #10b981;
--secondary-color: #059669;
--accent-color: #34d399;

/* Orange Theme */
--primary-color: #f59e0b;
--secondary-color: #d97706;
--accent-color: #fbbf24;
```

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 🔧 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help customizing the portfolio:
- 📧 Email: [shaikhubaid769@gmail.com](mailto:shaikhubaid769@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/ubaidsk](https://linkedin.com/in/ubaidsk)
- 🐱 GitHub: [github.com/ubaidsk](https://github.com/ubaidsk)

---

⭐ If you found this portfolio template helpful, please give it a star!

Built with ❤️ by [Ubaid Shaikh](https://github.com/ubaidsk)
