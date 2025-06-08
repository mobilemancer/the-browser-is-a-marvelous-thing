// Demo functions for the presentation
window.demoFunctions = {
    demoFileAPI: function () {
        alert('In a real environment, this would open a native file picker!\n\nThe File System Access API lets web apps:\n• Read files from your computer\n• Save files directly to folders\n• Edit files in place\n• Work like desktop applications');
    },

    demoViewTransition: function () {
        const content = document.getElementById('transitionContent');
        if (content) {
            const gradientClasses = [
                'gradient-blue-cyan',
                'gradient-red-orange',
                'gradient-teal-green',
                'gradient-blue-lime'
            ];

            // Find current gradient class
            let currentIndex = -1;
            for (let i = 0; i < gradientClasses.length; i++) {
                if (content.classList.contains(gradientClasses[i])) {
                    currentIndex = i;
                    break;
                }
            }

            // If no gradient class found, start with first one
            if (currentIndex === -1) currentIndex = 0;

            const nextIndex = (currentIndex + 1) % gradientClasses.length;

            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    // Remove current gradient class and add next one
                    content.classList.remove(gradientClasses[currentIndex]);
                    content.classList.add(gradientClasses[nextIndex]);
                });
            } else {
                // Remove current gradient class and add next one
                content.classList.remove(gradientClasses[currentIndex]);
                content.classList.add(gradientClasses[nextIndex]);
            }
        }
    },

    // Demo function for transition cards
    transitionCard: function (cardElement) {
        const gradientClasses = [
            'gradient-blue-cyan',
            'gradient-red-orange',
            'gradient-teal-green',
            'gradient-blue-lime',
            'gradient-aqua-pink',
            'gradient-peach-orange'
        ];

        // Find current gradient class
        let currentIndex = -1;
        for (let i = 0; i < gradientClasses.length; i++) {
            if (cardElement.classList.contains(gradientClasses[i])) {
                currentIndex = i;
                break;
            }
        }

        // If no gradient class found, start with first one
        if (currentIndex === -1) currentIndex = 0;

        const nextIndex = (currentIndex + 1) % gradientClasses.length;

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                // Remove current gradient class and add next one
                cardElement.classList.remove(gradientClasses[currentIndex]);
                cardElement.classList.add(gradientClasses[nextIndex]);
            });
        } else {
            // Remove current gradient class and add next one
            cardElement.classList.remove(gradientClasses[currentIndex]);
            cardElement.classList.add(gradientClasses[nextIndex]);
        }
    },

    // Demo function for hero transition card
    transitionHeroCard: function (cardElement) {
        const themes = [
            {
                gradient: 'gradient-blue-cyan',
                emoji: '🌊',
                title: 'Ocean Waves',
                subtitle: 'Click to transform'
            },
            {
                gradient: 'gradient-red-orange',
                emoji: '🔥',
                title: 'Blazing Fire',
                subtitle: 'Feel the heat'
            },
            {
                gradient: 'gradient-teal-green',
                emoji: '🌿',
                title: 'Forest Vibes',
                subtitle: 'Nature calls'
            },
            {
                gradient: 'gradient-blue-lime',
                emoji: '⚡',
                title: 'Electric Storm',
                subtitle: 'Power surge'
            },
            {
                gradient: 'gradient-aqua-pink',
                emoji: '🌸',
                title: 'Cherry Blossom',
                subtitle: 'Spring beauty'
            },
            {
                gradient: 'gradient-peach-orange',
                emoji: '🌅',
                title: 'Golden Sunrise',
                subtitle: 'New beginnings'
            }
        ];

        // Find current theme
        let currentIndex = -1;
        for (let i = 0; i < themes.length; i++) {
            if (cardElement.classList.contains(themes[i].gradient)) {
                currentIndex = i;
                break;
            }
        }

        // If no theme found, start with first one
        if (currentIndex === -1) currentIndex = 0;

        const nextIndex = (currentIndex + 1) % themes.length;
        const currentTheme = themes[currentIndex];
        const nextTheme = themes[nextIndex];

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                // Update gradient class
                cardElement.classList.remove(currentTheme.gradient);
                cardElement.classList.add(nextTheme.gradient);

                // Update content
                const emoji = cardElement.querySelector('.hero-emoji');
                const title = cardElement.querySelector('.hero-title');
                const subtitle = cardElement.querySelector('.hero-subtitle');

                if (emoji) emoji.textContent = nextTheme.emoji;
                if (title) title.textContent = nextTheme.title;
                if (subtitle) subtitle.textContent = nextTheme.subtitle;
            });
        } else {
            // Fallback without view transitions
            cardElement.classList.remove(currentTheme.gradient);
            cardElement.classList.add(nextTheme.gradient);

            const emoji = cardElement.querySelector('.hero-emoji');
            const title = cardElement.querySelector('.hero-title');
            const subtitle = cardElement.querySelector('.hero-subtitle');

            if (emoji) emoji.textContent = nextTheme.emoji;
            if (title) title.textContent = nextTheme.title;
            if (subtitle) subtitle.textContent = nextTheme.subtitle;
        }
    },

    // Toggle CSS layers demo - highlight utility layer
    toggleLayerHighlight: function () {
        const demoCard = document.getElementById('demoCard');

        if (demoCard) {
            // Toggle the highlight class to show utility layer priority
            demoCard.classList.toggle('highlight-box');
        }
    },

    demoDevTools: function () {
        console.log('🔧 DevTools Demo Functions:');
        console.table([
            { Feature: 'CSS Grid Inspector', Status: 'Available' },
            { Feature: 'Container Queries Debug', Status: 'Available' },
            { Feature: 'Performance Profiling', Status: 'Available' }
        ]);

        console.time('demo-operation');
        setTimeout(() => {
            console.timeEnd('demo-operation');
            console.log('Performance memory:', performance.memory);
            console.log('Check the Network tab, Console tab, and Elements tab!');
        }, 100);

        alert('Check the browser console (F12) to see the demo output!');
    }
};

// Copy code functionality
function copyCodeToClipboard(button) {
    const codeContent = button.closest('.code-header').nextElementSibling;
    const code = codeContent.textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = '✅';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const originalText = button.textContent;
        button.textContent = '✅';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// Make functions available globally for onclick handlers
window.demoFileAPI = window.demoFunctions.demoFileAPI;
window.demoViewTransition = window.demoFunctions.demoViewTransition;
window.demoDevTools = window.demoFunctions.demoDevTools;
window.transitionCard = window.demoFunctions.transitionCard;
window.transitionHeroCard = window.demoFunctions.transitionHeroCard;
window.toggleLayerHighlight = window.demoFunctions.toggleLayerHighlight;
window.resetLayerDemo = window.demoFunctions.resetLayerDemo;
window.copyCodeToClipboard = copyCodeToClipboard;
