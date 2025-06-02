/**
 * Typing Animation Utility
 * A reusable typing animation that can be applied to any element
 */

class TypingAnimation {
    constructor(elementId, options = {}) {
        this.element = document.getElementById(elementId);
        
        if (!this.element) {
            console.warn(`TypingAnimation: Element with id '${elementId}' not found`);
            return;
        }
        
        // Default configuration
        this.config = {
            typingSpeed: { min: 80, max: 120 },
            deletingSpeed: { min: 30, max: 60 },
            pauseAfterTyping: 2500,
            pauseAfterDeleting: 300,
            initialDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            ...options
        };
        
        // Get titles from data attribute or options
        this.titles = this.getTitles();
        
        if (!this.titles || this.titles.length === 0) {
            console.warn('TypingAnimation: No titles found to animate');
            return;
        }
        
        // Animation state
        this.currentTitleIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        this.isRunning = false;
        
        this.init();
    }
    
    getTitles() {
        // Try to get titles from data attribute first
        const titlesData = this.element.getAttribute('data-titles');
        if (titlesData) {
            return titlesData.split(',').map(title => title.trim());
        }
        
        // Fall back to options
        if (this.config.titles && Array.isArray(this.config.titles)) {
            return this.config.titles;
        }
        
        return null;
    }
    
    getRandomSpeed(range) {
        return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    }
    
    updateText(text) {
        if (this.config.showCursor) {
            this.element.textContent = text;
        } else {
            this.element.textContent = text;
        }
    }
    
    typeCharacter() {
        if (this.isWaiting || !this.isRunning) return;
        
        const currentTitle = this.titles[this.currentTitleIndex];
        
        if (!this.isDeleting) {
            // Typing phase
            const currentText = currentTitle.substring(0, this.currentCharIndex + 1);
            this.updateText(currentText);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentTitle.length) {
                // Finished typing, pause then start deleting (if looping)
                if (this.config.loop) {
                    this.isWaiting = true;
                    setTimeout(() => {
                        this.isWaiting = false;
                        this.isDeleting = true;
                        this.typeCharacter();
                    }, this.config.pauseAfterTyping);
                }
                return;
            }
            
            setTimeout(() => this.typeCharacter(), this.getRandomSpeed(this.config.typingSpeed));
        } else {
            // Deleting phase
            const currentText = currentTitle.substring(0, this.currentCharIndex);
            this.updateText(currentText);
            this.currentCharIndex--;
            
            if (this.currentCharIndex < 0) {
                // Finished deleting, move to next title
                this.isDeleting = false;
                this.currentCharIndex = 0;
                this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
                
                this.isWaiting = true;
                setTimeout(() => {
                    this.isWaiting = false;
                    this.typeCharacter();
                }, this.config.pauseAfterDeleting);
                return;
            }
            
            setTimeout(() => this.typeCharacter(), this.getRandomSpeed(this.config.deletingSpeed));
        }
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        setTimeout(() => {
            this.typeCharacter();
        }, this.config.initialDelay);
    }
    
    stop() {
        this.isRunning = false;
    }
    
    restart() {
        this.stop();
        this.currentTitleIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        this.updateText('');
        this.start();
    }
    
    init() {
        // Auto-start the animation
        this.start();
    }
}

// Convenience function for simple usage
function createTypingAnimation(elementId, options = {}) {
    return new TypingAnimation(elementId, options);
}

// Auto-initialize animations for elements with data-typing-animation attribute
function initAutoTypingAnimations() {
    const elements = document.querySelectorAll('[data-typing-animation]');
    
    elements.forEach(element => {
        const options = {};
        
        // Parse options from data attributes
        if (element.dataset.typingSpeed) {
            const speed = parseInt(element.dataset.typingSpeed);
            options.typingSpeed = { min: speed - 20, max: speed + 20 };
        }
        
        if (element.dataset.deletingSpeed) {
            const speed = parseInt(element.dataset.deletingSpeed);
            options.deletingSpeed = { min: speed - 10, max: speed + 10 };
        }
        
        if (element.dataset.pauseAfterTyping) {
            options.pauseAfterTyping = parseInt(element.dataset.pauseAfterTyping);
        }
        
        if (element.dataset.loop !== undefined) {
            options.loop = element.dataset.loop !== 'false';
        }
        
        if (element.dataset.showCursor !== undefined) {
            options.showCursor = element.dataset.showCursor !== 'false';
        }
        
        if (element.dataset.titles) {
            options.titles = element.dataset.titles.split(',').map(title => title.trim());
        }
        
        new TypingAnimation(element.id, options);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAutoTypingAnimations);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TypingAnimation, createTypingAnimation };
}
