const path = require('path');

// Set up the Ghost environment
process.env.NODE_ENV = 'development';

const ghost = require('./current/core/boot');
const {promises: fs} = require('fs');

async function createPortfolioSamples() {
    console.log('Starting Ghost boot process...');
    
    try {
        const bootPromise = ghost();
        const app = await bootPromise;
        
        console.log('Ghost booted successfully!');
        
        // Get the models
        const models = require('./current/core/server/models');
        
        // Sample portfolio items data
        const portfolioItems = [
            {
                title: 'Modern E-Commerce Platform',
                slug: 'modern-ecommerce-platform',
                custom_excerpt: 'A full-stack e-commerce solution built with React and Node.js',
                html: `<p>This project showcases a modern e-commerce platform with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.</p>
                <h2>Key Features</h2>
                <ul>
                <li>Responsive design optimized for all devices</li>
                <li>Real-time inventory tracking</li>
                <li>Secure payment integration with Stripe</li>
                <li>AI-powered product recommendations</li>
                <li>Admin dashboard with analytics</li>
                </ul>
                <h2>Technologies Used</h2>
                <ul>
                <li>Frontend: React, Redux, Tailwind CSS</li>
                <li>Backend: Node.js, Express, PostgreSQL</li>
                <li>Payment: Stripe API</li>
                <li>Deployment: AWS, Docker</li>
                </ul>`,
                featured: true,
                status: 'published',
                visibility: 'public',
                tags: ['Web Development', 'React', 'Node.js', 'E-commerce']
            },
            {
                title: 'Mobile Banking App UI/UX Design',
                slug: 'mobile-banking-app-design',
                custom_excerpt: 'Complete UI/UX redesign for a digital banking application',
                html: `<p>A comprehensive redesign of a mobile banking application focusing on user experience, accessibility, and modern design principles.</p>
                <h2>Design Process</h2>
                <p>The project began with extensive user research, including interviews with over 50 banking customers to understand their pain points and needs.</p>
                <h2>Key Improvements</h2>
                <ul>
                <li>Simplified navigation with intuitive gesture controls</li>
                <li>Biometric authentication for enhanced security</li>
                <li>Dark mode support for better visibility</li>
                <li>Accessible design following WCAG guidelines</li>
                <li>Micro-interactions for better user feedback</li>
                </ul>
                <h2>Results</h2>
                <p>The redesign resulted in a 40% increase in user engagement and a 60% reduction in support tickets related to navigation issues.</p>`,
                featured: true,
                status: 'published',
                visibility: 'public',
                tags: ['UI/UX Design', 'Mobile App', 'Banking', 'Figma']
            },
            {
                title: 'AI-Powered Content Management System',
                slug: 'ai-content-management-system',
                custom_excerpt: 'An intelligent CMS with automated content optimization and SEO features',
                html: `<p>Developed an innovative content management system that leverages artificial intelligence to help content creators optimize their work for better engagement and SEO performance.</p>
                <h2>Core Features</h2>
                <ul>
                <li>AI-powered content suggestions</li>
                <li>Automated SEO optimization</li>
                <li>Multi-language support with AI translation</li>
                <li>Smart image optimization and tagging</li>
                <li>Content performance analytics</li>
                </ul>
                <h2>Technical Implementation</h2>
                <p>The system uses natural language processing to analyze content and provide real-time suggestions for improvement. It integrates with popular SEO tools and provides automated optimization recommendations.</p>
                <h2>Impact</h2>
                <p>Users reported an average 35% increase in organic traffic after implementing the AI-suggested optimizations.</p>`,
                featured: true,
                status: 'published',
                visibility: 'public',
                tags: ['AI/ML', 'Content Management', 'Python', 'SEO']
            },
            {
                title: 'Corporate Brand Identity Design',
                slug: 'corporate-brand-identity',
                custom_excerpt: 'Complete brand identity package for a tech startup',
                html: `<p>Created a comprehensive brand identity for a technology startup, including logo design, color palette, typography, and brand guidelines.</p>
                <h2>Project Scope</h2>
                <ul>
                <li>Logo design and variations</li>
                <li>Color palette development</li>
                <li>Typography selection</li>
                <li>Business card and stationery design</li>
                <li>Brand guidelines document</li>
                <li>Social media templates</li>
                </ul>
                <h2>Design Philosophy</h2>
                <p>The brand identity reflects the company's innovative spirit while maintaining professionalism. The color palette combines energetic blues with calming grays to convey both innovation and reliability.</p>
                <h2>Deliverables</h2>
                <p>Delivered a complete brand package that has been successfully implemented across all company touchpoints, from digital platforms to physical marketing materials.</p>`,
                featured: true,
                status: 'published',
                visibility: 'public',
                tags: ['Branding', 'Graphic Design', 'Logo Design', 'Identity']
            },
            {
                title: 'Real-Time Data Visualization Dashboard',
                slug: 'data-visualization-dashboard',
                custom_excerpt: 'Interactive dashboard for monitoring business metrics in real-time',
                html: `<p>Built a sophisticated data visualization dashboard that transforms complex business data into intuitive, actionable insights through interactive charts and graphs.</p>
                <h2>Key Features</h2>
                <ul>
                <li>Real-time data updates via WebSockets</li>
                <li>Customizable widget-based layout</li>
                <li>Advanced filtering and drill-down capabilities</li>
                <li>Export functionality for reports</li>
                <li>Mobile-responsive design</li>
                </ul>
                <h2>Technologies</h2>
                <ul>
                <li>Frontend: Vue.js, D3.js, Chart.js</li>
                <li>Backend: Python, FastAPI, Redis</li>
                <li>Database: PostgreSQL, InfluxDB</li>
                <li>Real-time: WebSockets, Apache Kafka</li>
                </ul>
                <h2>Performance</h2>
                <p>The dashboard can handle over 10,000 concurrent users with sub-second response times for most queries.</p>`,
                featured: true,
                status: 'published',
                visibility: 'public',
                tags: ['Data Visualization', 'Dashboard', 'Vue.js', 'Python']
            },
            {
                title: 'Sustainable Architecture Portfolio',
                slug: 'sustainable-architecture-portfolio',
                custom_excerpt: 'Eco-friendly residential design combining modern aesthetics with sustainability',
                html: `<p>A collection of sustainable architecture projects focusing on eco-friendly residential designs that minimize environmental impact while maximizing comfort and aesthetic appeal.</p>
                <h2>Design Principles</h2>
                <ul>
                <li>Passive solar design for natural heating and cooling</li>
                <li>Rainwater harvesting systems</li>
                <li>Use of recycled and locally sourced materials</li>
                <li>Integration with natural landscape</li>
                <li>Energy-efficient systems and appliances</li>
                </ul>
                <h2>Featured Projects</h2>
                <p>The portfolio includes designs for single-family homes, multi-unit dwellings, and community spaces, all incorporating sustainable design principles.</p>
                <h2>Recognition</h2>
                <p>Several designs from this portfolio have been recognized with green building certifications and have been featured in architectural publications.</p>`,
                featured: true,
                status: 'published',
                visibility: 'public',
                tags: ['Architecture', 'Sustainability', 'Design', 'Green Building']
            }
        ];
        
        // First, create tags
        const tagNames = [...new Set(portfolioItems.flatMap(item => item.tags))];
        const tags = {};
        
        console.log('Creating tags...');
        for (const tagName of tagNames) {
            try {
                const existingTag = await models.Tag.findOne({name: tagName});
                if (existingTag) {
                    tags[tagName] = existingTag;
                } else {
                    const tag = await models.Tag.add({
                        name: tagName,
                        slug: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
                    }, {context: {internal: true}});
                    tags[tagName] = tag;
                }
            } catch (error) {
                console.log(`Tag ${tagName} might already exist, skipping...`);
            }
        }
        
        // Get the first user to be the author
        const author = await models.User.findOne({status: 'active'});
        
        // Create portfolio posts
        console.log('Creating portfolio posts...');
        for (const item of portfolioItems) {
            try {
                // Check if post already exists
                const existingPost = await models.Post.findOne({slug: item.slug});
                if (existingPost) {
                    console.log(`Post ${item.title} already exists, skipping...`);
                    continue;
                }
                
                const postData = {
                    title: item.title,
                    slug: item.slug,
                    mobiledoc: JSON.stringify({
                        version: '0.3.1',
                        atoms: [],
                        cards: [],
                        markups: [],
                        sections: [[1, 'p', [[0, [], 0, '']]]]
                    }),
                    html: item.html,
                    custom_excerpt: item.custom_excerpt,
                    featured: item.featured,
                    status: item.status,
                    visibility: item.visibility,
                    created_by: author.id,
                    published_by: author.id,
                    published_at: new Date()
                };
                
                const post = await models.Post.add(postData, {
                    context: {internal: true},
                    withRelated: ['tags']
                });
                
                // Attach tags
                const tagIds = item.tags.map(tagName => tags[tagName].id);
                await post.tags().attach(tagIds);
                
                console.log(`Created: ${item.title}`);
            } catch (error) {
                console.error(`Error creating post ${item.title}:`, error.message);
            }
        }
        
        // Create the portfolio page
        console.log('Creating portfolio page...');
        try {
            const existingPage = await models.Post.findOne({slug: 'portfolio', type: 'page'});
            if (!existingPage) {
                const portfolioPage = await models.Post.add({
                    title: 'Portfolio',
                    slug: 'portfolio',
                    mobiledoc: JSON.stringify({
                        version: '0.3.1',
                        atoms: [],
                        cards: [],
                        markups: [],
                        sections: [[1, 'p', [[0, [], 0, 'Browse through my collection of work across various disciplines including web development, design, and creative projects.']]]]
                    }),
                    html: '<p>Browse through my collection of work across various disciplines including web development, design, and creative projects.</p>',
                    custom_excerpt: 'Explore my portfolio of creative work and professional projects',
                    type: 'page',
                    status: 'published',
                    visibility: 'public',
                    created_by: author.id,
                    published_by: author.id,
                    published_at: new Date(),
                    page: true
                }, {context: {internal: true}});
                
                console.log('Portfolio page created successfully!');
            } else {
                console.log('Portfolio page already exists.');
            }
        } catch (error) {
            console.error('Error creating portfolio page:', error.message);
        }
        
        // Create About page
        console.log('Creating About page...');
        try {
            const existingAbout = await models.Post.findOne({slug: 'about', type: 'page'});
            if (!existingAbout) {
                const aboutPage = await models.Post.add({
                    title: 'About',
                    slug: 'about',
                    mobiledoc: JSON.stringify({
                        version: '0.3.1',
                        atoms: [],
                        cards: [],
                        markups: [],
                        sections: [[1, 'p', [[0, [], 0, '']]]]
                    }),
                    html: `<h2>Hello, I'm a Creative Professional</h2>
                    <p>Welcome to my portfolio! I'm a passionate designer and developer with over 10 years of experience creating digital experiences that delight users and drive business results.</p>
                    <h3>My Journey</h3>
                    <p>My career began in graphic design, where I learned the fundamentals of visual communication. Over the years, I've expanded my skills to include web development, user experience design, and digital strategy.</p>
                    <h3>What I Do</h3>
                    <ul>
                    <li><strong>Web Development:</strong> Full-stack development using modern frameworks and best practices</li>
                    <li><strong>UI/UX Design:</strong> Creating intuitive interfaces that users love</li>
                    <li><strong>Brand Identity:</strong> Developing cohesive visual identities that tell your story</li>
                    <li><strong>Digital Strategy:</strong> Helping businesses succeed in the digital landscape</li>
                    </ul>
                    <h3>My Approach</h3>
                    <p>I believe in creating work that not only looks beautiful but also serves a purpose. Every project starts with understanding the problem we're trying to solve and the people we're solving it for.</p>
                    <p>Let's work together to bring your ideas to life!</p>`,
                    type: 'page',
                    status: 'published',
                    visibility: 'public',
                    created_by: author.id,
                    published_by: author.id,
                    published_at: new Date(),
                    page: true
                }, {context: {internal: true}});
                
                console.log('About page created successfully!');
            } else {
                console.log('About page already exists.');
            }
        } catch (error) {
            console.error('Error creating About page:', error.message);
        }
        
        // Create Contact page
        console.log('Creating Contact page...');
        try {
            const existingContact = await models.Post.findOne({slug: 'contact', type: 'page'});
            if (!existingContact) {
                const contactPage = await models.Post.add({
                    title: 'Contact',
                    slug: 'contact',
                    mobiledoc: JSON.stringify({
                        version: '0.3.1',
                        atoms: [],
                        cards: [],
                        markups: [],
                        sections: [[1, 'p', [[0, [], 0, '']]]]
                    }),
                    html: `<h2>Let's Connect</h2>
                    <p>I'm always interested in new projects and opportunities. Whether you have a specific project in mind or just want to chat about possibilities, I'd love to hear from you.</p>
                    <h3>How to Reach Me</h3>
                    <p>The best way to get in touch is through the contact form on this page. I typically respond within 24-48 hours.</p>
                    <h3>What Happens Next?</h3>
                    <ol>
                    <li>You send me a message with details about your project</li>
                    <li>I'll review your requirements and get back to you</li>
                    <li>We'll schedule a call to discuss your needs in detail</li>
                    <li>I'll provide a proposal outlining the scope, timeline, and investment</li>
                    </ol>
                    <p>Looking forward to hearing from you!</p>`,
                    custom_excerpt: 'Get in touch to discuss your next project',
                    type: 'page',
                    status: 'published',
                    visibility: 'public',
                    created_by: author.id,
                    published_by: author.id,
                    published_at: new Date(),
                    page: true
                }, {context: {internal: true}});
                
                console.log('Contact page created successfully!');
            } else {
                console.log('Contact page already exists.');
            }
        } catch (error) {
            console.error('Error creating Contact page:', error.message);
        }
        
        console.log('\nAll portfolio samples created successfully!');
        console.log('\nDon\'t forget to:');
        console.log('1. Upload feature images for each portfolio item');
        console.log('2. Update the navigation menu in Ghost admin');
        console.log('3. Activate the Portfolio theme if not already active');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

createPortfolioSamples();