// Cyberpunk Magic Portfolio JavaScript

class CyberMagicPortfolio {
    constructor() {
        this.wandActivated = false;
        this.currentSection = 'home';
        this.particles = [];
        this.trailParticles = [];
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupWand();
        this.setupNavigation();
        this.setupParticles();
        this.setupSkillNodes();
        this.setupProjectBooks();
        this.setupContactForm();
        this.startAnimationLoop();
        
        // Custom cursor
        this.setupCustomCursor();
        
        // Show initial section properly
        this.showSection('home');
    }

    setupCanvas() {
        // Particles canvas
        this.particlesCanvas = document.getElementById('particles-canvas');
        if (this.particlesCanvas) {
            this.particlesCanvas.width = window.innerWidth;
            this.particlesCanvas.height = window.innerHeight;
        }
        
        // Magic trail canvas
        this.trailCanvas = document.getElementById('magic-trail');
        this.trailCtx = this.trailCanvas.getContext('2d');
        this.trailCanvas.width = window.innerWidth;
        this.trailCanvas.height = window.innerHeight;
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (this.particlesCanvas) {
                this.particlesCanvas.width = window.innerWidth;
                this.particlesCanvas.height = window.innerHeight;
            }
            this.trailCanvas.width = window.innerWidth;
            this.trailCanvas.height = window.innerHeight;
        });
    }

    setupWand() {
        this.wand = document.getElementById('magic-wand');
        this.wandPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.wand.addEventListener('click', () => {
            if (!this.wandActivated) {
                this.activateWand();
            }
        });

        // Follow mouse when activated
        document.addEventListener('mousemove', (e) => {
            if (this.wandActivated) {
                this.wandPosition.x = e.clientX;
                this.wandPosition.y = e.clientY;
                this.updateWandPosition(e.clientX, e.clientY);
                this.createMagicTrail(e.clientX, e.clientY);
            }
        });

        // Touch support
        document.addEventListener('touchmove', (e) => {
            if (this.wandActivated) {
                const touch = e.touches[0];
                this.wandPosition.x = touch.clientX;
                this.wandPosition.y = touch.clientY;
                this.updateWandPosition(touch.clientX, touch.clientY);
                this.createMagicTrail(touch.clientX, touch.clientY);
            }
        });
    }

    activateWand() {
        this.wandActivated = true;
        this.wand.classList.add('activated');
        
        // Show navigation
        const nav = document.getElementById('cyber-nav');
        nav.classList.remove('hidden');
        
        // Create magical activation effect
        this.createActivationBurst();
        
        // Play activation sound (placeholder)
        this.playSound('activation');
    }

    updateWandPosition(x, y) {
        if (window.innerWidth > 768) {
            this.wand.style.left = (x - 60) + 'px';
            this.wand.style.top = (y - 25) + 'px';
        }
    }

    createMagicTrail(x, y) {
        const colors = ['#00D9FF', '#B026FF', '#FFD700', '#00FFF0'];
        
        for (let i = 0; i < 3; i++) {
            this.trailParticles.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1,
                decay: 0.02,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 4 + 2
            });
        }
    }

    createActivationBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2;
            const velocity = Math.random() * 8 + 4;
            
            this.trailParticles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                decay: 0.01,
                color: ['#00D9FF', '#B026FF', '#FFD700'][Math.floor(Math.random() * 3)],
                size: Math.random() * 6 + 3
            });
        }
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetSection = item.dataset.section;
                console.log('Navigating to:', targetSection); // Debug log
                
                this.navigateToSection(targetSection);
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Create navigation effect
                this.createNavigationEffect();
            });
        });
    }

    navigateToSection(sectionId) {
        console.log('Current section:', this.currentSection, 'Target section:', sectionId); // Debug log
        
        // Hide all sections first
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            this.currentSection = sectionId;
            
            console.log('Successfully navigated to:', sectionId); // Debug log
            
            // Scroll to top of the new section
            window.scrollTo(0, 0);
            
            // Trigger section-specific animations
            setTimeout(() => {
                this.triggerSectionAnimation(sectionId);
            }, 100);
        } else {
            console.error('Section not found:', sectionId); // Debug log
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            this.currentSection = sectionId;
        }
    }

    createNavigationEffect() {
        // Create a burst of particles from wand position
        if (this.wandActivated) {
            for (let i = 0; i < 20; i++) {
                this.trailParticles.push({
                    x: this.wandPosition.x,
                    y: this.wandPosition.y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 1,
                    decay: 0.025,
                    color: '#FFD700',
                    size: Math.random() * 5 + 2
                });
            }
        }
        
        this.playSound('navigate');
    }

    triggerSectionAnimation(sectionId) {
        const section = document.getElementById(sectionId);
        
        switch(sectionId) {
            case 'home':
                this.animateHomeElements();
                break;
            case 'about':
                this.animateAboutElements();
                break;
            case 'skills':
                this.animateSkillNodes();
                break;
            case 'projects':
                this.animateProjectBooks();
                break;
            case 'volunteer':
                this.animateVolunteerQuests();
                break;
            case 'contact':
                this.animatePortalRings();
                break;
        }
    }

    animateHomeElements() {
        const glitchText = document.querySelector('.glitch-text');
        const subtitle = document.querySelector('.hero-subtitle');
        const statPanel = document.querySelector('.stat-panel');
        
        if (glitchText) {
            glitchText.style.opacity = '0';
            glitchText.style.transform = 'translateY(30px)';
            setTimeout(() => {
                glitchText.style.transition = 'all 0.8s ease-out';
                glitchText.style.opacity = '1';
                glitchText.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (subtitle) {
            subtitle.style.opacity = '0';
            setTimeout(() => {
                subtitle.style.transition = 'all 0.8s ease-out';
                subtitle.style.opacity = '1';
            }, 300);
        }
        
        if (statPanel) {
            statPanel.style.opacity = '0';
            statPanel.style.transform = 'translateY(50px)';
            setTimeout(() => {
                statPanel.style.transition = 'all 0.8s ease-out';
                statPanel.style.opacity = '1';
                statPanel.style.transform = 'translateY(0)';
            }, 500);
        }
    }

    setupParticles() {
        // Create floating background particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: ['#00D9FF', '#B026FF', '#FFD700', '#00FFF0'][Math.floor(Math.random() * 4)]
            });
        }
    }

    setupSkillNodes() {
        const skillNodes = document.querySelectorAll('.skill-node');
        
        skillNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                // Create skill hover effect
                this.createSkillEffect(node);
            });
            
            node.addEventListener('click', () => {
                // Show skill info (could expand this)
                this.showSkillInfo(node.dataset.skill);
            });
        });
    }

    createSkillEffect(node) {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 10; i++) {
            this.trailParticles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 1,
                decay: 0.03,
                color: '#00D9FF',
                size: Math.random() * 3 + 1
            });
        }
    }

    showSkillInfo(skill) {
        // Could implement a tooltip or modal here
        console.log(`Showing info for ${skill}`);
        this.playSound('skill');
    }

    animateSkillNodes() {
        const skillNodes = document.querySelectorAll('.skill-node');
        
        skillNodes.forEach((node, index) => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                node.style.transition = 'all 0.5s ease-out';
                node.style.opacity = '1';
                node.style.transform = 'scale(1)';
                
                // Add pulse effect
                setTimeout(() => {
                    node.style.animation = 'highlight-pulse 0.8s ease-out';
                }, 200);
            }, index * 50);
        });
    }

    setupProjectBooks() {
        const projectBooks = document.querySelectorAll('.project-spellbook');
        
        projectBooks.forEach(book => {
            book.addEventListener('mouseenter', () => {
                this.createBookMagic(book);
            });
            
            // Handle project links
            const links = book.querySelectorAll('.spell-link');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.createLinkEffect(link);
                });
            });
        });
    }

    createBookMagic(book) {
        const rect = book.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create magical sparkles around the book
        for (let i = 0; i < 15; i++) {
            this.trailParticles.push({
                x: centerX + (Math.random() - 0.5) * rect.width,
                y: centerY + (Math.random() - 0.5) * rect.height,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1,
                decay: 0.02,
                color: '#FFD700',
                size: Math.random() * 4 + 2
            });
        }
    }

    createLinkEffect(link) {
        const rect = link.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            this.trailParticles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                decay: 0.04,
                color: '#00FFF0',
                size: Math.random() * 3 + 1
            });
        }
    }

    animateProjectBooks() {
        const books = document.querySelectorAll('.project-spellbook');
        
        books.forEach((book, index) => {
            book.style.opacity = '0';
            book.style.transform = 'translateY(50px) rotateY(-15deg)';
            
            setTimeout(() => {
                book.style.transition = 'all 0.6s ease-out';
                book.style.opacity = '1';
                book.style.transform = 'translateY(0) rotateY(0deg)';
            }, index * 150);
        });
    }

    animateAboutElements() {
        const avatar = document.querySelector('.cyber-portrait');
        const panels = document.querySelectorAll('.bio-panel, .info-item, .strength-badge');
        
        if (avatar) {
            avatar.style.opacity = '0';
            avatar.style.transform = 'scale(0.8)';
            setTimeout(() => {
                avatar.style.transition = 'all 0.8s ease-out';
                avatar.style.opacity = '1';
                avatar.style.transform = 'scale(1)';
                avatar.style.animation = 'avatar-pulse 2s ease-out';
            }, 100);
        }
        
        panels.forEach((panel, index) => {
            panel.style.opacity = '0';
            panel.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                panel.style.transition = 'all 0.6s ease-out';
                panel.style.opacity = '1';
                panel.style.transform = 'translateX(0)';
            }, 200 + (index * 100));
        });
    }

    animateVolunteerQuests() {
        const questItems = document.querySelectorAll('.quest-item');
        
        questItems.forEach((quest, index) => {
            const badge = quest.querySelector('.quest-badge');
            const content = quest.querySelector('.quest-content');
            
            if (badge) {
                badge.style.opacity = '0';
                badge.style.transform = 'scale(0) rotate(180deg)';
            }
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'translateX(50px)';
            }
            
            setTimeout(() => {
                if (badge) {
                    badge.style.transition = 'all 0.6s ease-out';
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1) rotate(0deg)';
                }
                
                setTimeout(() => {
                    if (content) {
                        content.style.transition = 'all 0.6s ease-out';
                        content.style.opacity = '1';
                        content.style.transform = 'translateX(0)';
                    }
                }, 200);
            }, index * 300);
        });
    }

    animatePortalRings() {
        const rings = document.querySelectorAll('.ring');
        const form = document.querySelector('.contact-form');
        const infoPanel = document.querySelector('.contact-info');
        
        rings.forEach((ring, index) => {
            ring.style.opacity = '0';
            ring.style.transform = 'scale(0)';
            
            setTimeout(() => {
                ring.style.transition = 'all 0.8s ease-out';
                ring.style.opacity = '1';
                ring.style.transform = 'scale(1)';
                ring.style.animationDuration = ring.classList.contains('ring-1') ? '8s' : 
                                              ring.classList.contains('ring-2') ? '6s' : '4s';
            }, index * 200);
        });
        
        if (form) {
            form.style.opacity = '0';
            form.style.transform = 'scale(0.8)';
            setTimeout(() => {
                form.style.transition = 'all 0.8s ease-out';
                form.style.opacity = '1';
                form.style.transform = 'scale(1)';
            }, 600);
        }
        
        if (infoPanel) {
            infoPanel.style.opacity = '0';
            infoPanel.style.transform = 'translateX(50px)';
            setTimeout(() => {
                infoPanel.style.transition = 'all 0.8s ease-out';
                infoPanel.style.opacity = '1';
                infoPanel.style.transform = 'translateX(0)';
            }, 800);
        }
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.createInputEffect(input);
            });
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    createInputEffect(input) {
        const rect = input.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 5; i++) {
            this.trailParticles.push({
                x: centerX + (Math.random() - 0.5) * rect.width,
                y: centerY + (Math.random() - 0.5) * rect.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                decay: 0.03,
                color: '#00FFF0',
                size: Math.random() * 2 + 1
            });
        }
    }

    handleFormSubmission(form) {
        const button = form.querySelector('.portal-button');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span>Transmitting...</span>';
        button.disabled = true;
        
        // Create submission effect
        this.createPortalEffect();
        
        // Simulate form submission
        setTimeout(() => {
            button.innerHTML = '<span>Message Sent!</span>';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                form.reset();
            }, 2000);
        }, 2000);
        
        this.playSound('submit');
    }

    createPortalEffect() {
        const portal = document.querySelector('.contact-form');
        if (!portal) return;
        
        const rect = portal.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const radius = 100;
            
            this.trailParticles.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                vx: Math.cos(angle) * -4,
                vy: Math.sin(angle) * -4,
                life: 1,
                decay: 0.015,
                color: '#B026FF',
                size: Math.random() * 4 + 2
            });
        }
    }

    setupCustomCursor() {
        if (this.wandActivated) {
            document.body.style.cursor = 'none';
        }
    }

    startAnimationLoop() {
        this.animate();
    }

    animate() {
        this.updateParticles();
        this.updateTrailParticles();
        this.renderTrail();
        
        requestAnimationFrame(() => this.animate());
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            // Gentle floating motion
            particle.vx += (Math.random() - 0.5) * 0.1;
            particle.vy += (Math.random() - 0.5) * 0.1;
            
            // Limit velocity
            particle.vx = Math.max(-2, Math.min(2, particle.vx));
            particle.vy = Math.max(-2, Math.min(2, particle.vy));
        });
        
        this.renderParticles();
    }

    updateTrailParticles() {
        this.trailParticles = this.trailParticles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            // Slow down over time
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            return particle.life > 0;
        });
    }

    renderParticles() {
        if (!this.particlesCanvas) return;
        
        // Create floating particles effect using CSS animation
        // This is a simplified version - in a full implementation, 
        // you might use Canvas or WebGL for better performance
        
        // Add CSS-based particles
        if (this.particles.length > 0 && !document.querySelector('.floating-particle')) {
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.cssText = `
                    position: fixed;
                    width: 3px;
                    height: 3px;
                    background: #00D9FF;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: -1;
                    opacity: 0.6;
                    left: ${Math.random() * 100}vw;
                    top: ${Math.random() * 100}vh;
                    animation: float ${5 + Math.random() * 10}s infinite linear;
                `;
                document.body.appendChild(particle);
                
                // Remove after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 15000);
            }
        }
    }

    renderTrail() {
        if (!this.trailCtx) return;
        
        // Clear canvas with fade effect
        this.trailCtx.globalCompositeOperation = 'destination-out';
        this.trailCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.trailCtx.fillRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);
        
        // Draw particles
        this.trailCtx.globalCompositeOperation = 'source-over';
        
        this.trailParticles.forEach(particle => {
            this.trailCtx.save();
            this.trailCtx.globalAlpha = particle.life;
            this.trailCtx.fillStyle = particle.color;
            this.trailCtx.shadowBlur = 10;
            this.trailCtx.shadowColor = particle.color;
            
            this.trailCtx.beginPath();
            this.trailCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.trailCtx.fill();
            
            this.trailCtx.restore();
        });
    }

    playSound(type) {
        // Placeholder for sound effects
        // In a real implementation, you would play actual sound files
        console.log(`Playing ${type} sound`);
    }
}

// CSS for floating particles
const floatingParticleCSS = `
@keyframes float {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.6;
    }
    90% {
        opacity: 0.6;
    }
    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}
`;

// Add floating particle CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingParticleCSS;
document.head.appendChild(styleSheet);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberMagicPortfolio();
});

// Additional utility functions
function createMagicalEffect(element, options = {}) {
    const {
        particleCount = 10,
        color = '#00D9FF',
        duration = 1000
    } = options;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: magical-burst-${i} ${duration}ms ease-out forwards;
        `;
        
        // Create unique animation for each particle
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        
        const particleKeyframes = `
        @keyframes magical-burst-${i} {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${randomX}px, ${randomY}px) scale(0);
            }
        }
        `;
        
        const particleStyle = document.createElement('style');
        particleStyle.textContent = particleKeyframes;
        document.head.appendChild(particleStyle);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            if (particleStyle.parentNode) {
                particleStyle.parentNode.removeChild(particleStyle);
            }
        }, duration);
    }
}

// Glitch text effect for enhanced cyberpunk feel
function addGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.classList.add('glitch-active');
            setTimeout(() => {
                glitchText.classList.remove('glitch-active');
            }, 200);
        }, 5000);
    }
}

// Add glitch CSS
const glitchCSS = `
.glitch-active {
    animation: glitch 0.2s ease-in-out;
}

@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}
`;

const glitchStyleSheet = document.createElement('style');
glitchStyleSheet.textContent = glitchCSS;
document.head.appendChild(glitchStyleSheet);

// Initialize glitch effect
setTimeout(addGlitchEffect, 1000);