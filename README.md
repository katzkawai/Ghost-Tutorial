# Ghost Portfolio Theme

A modern, responsive portfolio theme for Ghost CMS with dark mode support and beautiful animations.

[日本語版 README はこちら](README.ja.md)

![Ghost Portfolio Theme](https://img.shields.io/badge/Ghost-5.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎨 Features

- **Modern Design**: Clean and professional layout perfect for showcasing your work
- **Dark Mode**: Automatic and manual dark/light theme switching
- **Responsive**: Fully responsive design that looks great on all devices
- **Portfolio Grid**: Beautiful grid layout with hover effects for your projects
- **Customizable**: Easy to customize colors, fonts, and layouts through Ghost admin
- **Performance**: Optimized for fast loading with lazy loading images
- **SEO Ready**: Built with SEO best practices in mind

## 📸 Screenshots

### Light Mode
- Clean, minimal design with focus on content
- Gradient hero section with call-to-action buttons
- Grid-based portfolio showcase

### Dark Mode
- Eye-friendly dark theme
- Maintains readability and visual hierarchy
- Smooth transitions between themes

## 🚀 Quick Start

### 1. Install Ghost
```bash
# Install Ghost-CLI
npm install ghost-cli -g

# Create a new directory and install Ghost
mkdir my-portfolio
cd my-portfolio
ghost install local
```

### 2. Install the Portfolio Theme
1. Download or clone this repository
2. Copy the `content/themes/portfolio` folder to your Ghost installation's `content/themes/` directory
3. Restart Ghost: `ghost restart`
4. Go to Ghost Admin → Settings → Design → Change theme
5. Activate the "Portfolio" theme

### 3. Configure Your Site
1. **Site Settings**: Update your site title, description, and logo in Ghost Admin → Settings → General
2. **Navigation**: Set up your menu in Ghost Admin → Settings → Navigation
   - Recommended structure:
     - Home → `/`
     - Portfolio → `/portfolio/`
     - About → `/about/`
     - Blog → `/blog/`
     - Contact → `/contact/`

### 4. Create Content

#### Portfolio Items
1. Create new posts and mark them as "Featured" to display in your portfolio
2. Add tags to categorize your work (e.g., "Web Development", "Design", "Photography")
3. Use high-quality feature images for best results

#### Required Pages
Create these pages for a complete portfolio site:
- **Portfolio** (slug: `portfolio`) - Uses the portfolio grid template
- **About** (slug: `about`) - Your personal or company information
- **Contact** (slug: `contact`) - Contact form and information

## 🎨 Customization Options

### Theme Settings
Available in Ghost Admin → Settings → Design:

- **Navigation Layout**: Logo on left or centered
- **Hero Style**: Full screen, Large, Medium, or Small
- **Portfolio Layout**: Grid, Masonry, or List
- **Accent Color**: Primary color for links and buttons
- **Background Colors**: Separate colors for light and dark modes
- **Social Links**: Toggle social media icons display

### Custom CSS
Add custom styles in Ghost Admin → Settings → Code Injection → Site Header:
```css
<style>
  :root {
    --accent-color: #your-color;
    --font-body: 'Your Font', sans-serif;
  }
</style>
```

## 📁 Theme Structure

```
portfolio/
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── built/
│       └── style.css       # Production CSS
├── partials/
│   ├── navigation.hbs      # Navigation menu
│   └── email-subscription.hbs # Newsletter signup
├── default.hbs             # Base template
├── index.hbs              # Homepage
├── post.hbs               # Blog post template
├── page.hbs               # Static page template
├── page-portfolio.hbs     # Portfolio page template
├── page-contact.hbs       # Contact page template
└── package.json           # Theme configuration
```

## 🛠️ Development

### Prerequisites
- Node.js (v18.12.1 or higher)
- Ghost-CLI
- Basic knowledge of Handlebars templating

### Local Development
1. Clone this repository
2. Link the theme to your local Ghost installation
3. Make your changes
4. Test thoroughly across different devices and browsers

### Building Assets
The theme uses standard CSS. To modify styles:
1. Edit `assets/css/style.css`
2. Copy to `assets/built/style.css` for production
3. Clear Ghost's cache if needed

## 📝 Sample Content

See `portfolio-setup-guide.md` for detailed instructions on creating sample content, including:
- 6 portfolio project examples
- About page content
- Contact page setup
- Blog post examples

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This theme is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Built for [Ghost CMS](https://ghost.org)
- Icons from [Heroicons](https://heroicons.com)
- Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)

## 💬 Support

- For theme-specific issues, please use the [GitHub Issues](https://github.com/katzkawai/my-second-ghost/issues)
- For Ghost-related questions, visit the [Ghost Forum](https://forum.ghost.org)
- For general support, check the [Ghost Documentation](https://ghost.org/docs/)

---

Made with ❤️ for the Ghost community