# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Static personal portfolio website for Fanush Gabriel Mihailescu, built with vanilla HTML, CSS, and JavaScript. No build tools or frameworks - pure static files with modern web technologies.

## Development Commands
Since this is a static site with no build process:
```bash
# Local development server
python -m http.server 8000
# or
npx serve .
# or
live-server .

# Open index.html directly in browser for basic testing
```

## Architecture & Code Organization

### File Structure
- `index.html` - Main page structure (307 lines)
- `script.js` - Primary JavaScript functionality (695 lines) 
- `data.js` - Project data and content configuration
- `style.css` - Main stylesheet (1,401 lines)
- `theme.css` - Theme system and color variables (471 lines)
- `email-config.js` - EmailJS integration
- `public/images/` - Project screenshots and assets

### JavaScript Architecture
- **ES6 Modules**: Uses import/export pattern
- **Class-based Theme Management**: ThemeManager class handles 3 themes (dark-violet, dark-orange, light)
- **Event-driven Mobile Interactions**: Sophisticated touch handling for carousel
- **Async/Await Patterns**: Modern JavaScript throughout
- **Component-like Functions**: renderProjects(), renderCarousel() act as components

### CSS Architecture
- **CSS Custom Properties**: Extensive theming system with `color-mix()` function
- **Multi-theme Support**: Theme switching via CSS variables in theme.css
- **Responsive Design**: 5 media query breakpoints, mobile-first approach
- **BEM-like Naming**: Consistent component-based class naming

### Key Features
- **Mobile Carousel**: Touch-enabled project showcase with smooth animations
- **Theme Persistence**: Local storage for user theme preferences  
- **EmailJS Contact Form**: Functional email delivery system
- **Intersection Observer**: Scroll-based animations
- **Dynamic Content**: JavaScript-rendered projects from data.js

## Important Technical Details

### Theme System
The theme system uses CSS custom properties defined in theme.css. When adding new colors:
1. Define base colors in `:root[data-theme="theme-name"]`
2. Create transparency variations using `color-mix()`
3. Update ThemeManager class in script.js if needed

### Mobile Carousel Implementation
- Touch event handling with startX/currentX tracking
- Smooth CSS transforms for animations
- Proper event cleanup and memory management
- Intersection Observer for auto-advance

### Project Data Structure
Projects are defined in data.js with this structure:
```javascript
{
    title: "Project Name",
    description: "Project description",
    technologies: ["Tech1", "Tech2"],
    image: "public/images/screenshot.png",
    liveLink: "https://...",
    githubLink: "https://..."
}
```

## External Dependencies
- Font Awesome 6.5.2 (CDN)
- Google Fonts: Montserrat & Open Sans (CDN)
- EmailJS SDK (CDN)

## Email Configuration
Email functionality requires EmailJS setup. See EMAIL_SETUP_INSTRUCTIONS.md for configuration details. Update email-config.js with proper service/template IDs.

## Deployment
Static hosting ready - no build process required. Deploy directly to:
- Netlify
- Vercel 
- GitHub Pages
- Any static hosting service

## Development Patterns
- Progressive enhancement (works without JavaScript for basic content)
- Component-like organization of JavaScript functions
- Semantic HTML with accessibility considerations
- Performance-focused with minimal dependencies
- Touch-first mobile experience design