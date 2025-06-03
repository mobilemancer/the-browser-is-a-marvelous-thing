// Demo functions for the presentation
window.demoFunctions = {
    demoFileAPI: function () {
        alert('In a real environment, this would open a native file picker!\n\nThe File System Access API lets web apps:\n• Read files from your computer\n• Save files directly to folders\n• Edit files in place\n• Work like desktop applications');
    },

    demoViewTransition: function () {
        const content = document.getElementById('transitionContent');
        if (content) {
            const colors = [
                'linear-gradient(45deg, #4facfe, #00f2fe)',
                'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                'linear-gradient(45deg, #4ecdc4, #44a08d)',
                'linear-gradient(45deg, #45b7d1, #96c93d)'
            ];

            const currentColor = content.style.background || colors[0];
            const currentIndex = colors.indexOf(currentColor);
            const nextIndex = (currentIndex + 1) % colors.length;

            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    content.style.background = colors[nextIndex];
                });
            } else {
                content.style.background = colors[nextIndex];
            }
        }
    },

    // Demo function for transition cards
    transitionCard: function (cardElement) {
        const colors = [
            'linear-gradient(45deg, #4facfe, #00f2fe)',
            'linear-gradient(45deg, #ff6b6b, #ee5a24)',
            'linear-gradient(45deg, #4ecdc4, #44a08d)',
            'linear-gradient(45deg, #45b7d1, #96c93d)',
            'linear-gradient(45deg, #a8edea, #fed6e3)',
            'linear-gradient(45deg, #ffecd2, #fcb69f)'
        ];

        const currentBg = cardElement.style.background || cardElement.style.backgroundImage || 'linear-gradient(45deg, #4facfe, #00f2fe)';
        let currentIndex = colors.findIndex(color => currentBg.includes(color.split(',')[0].split('(')[2]));
        if (currentIndex === -1) currentIndex = 0;

        const nextIndex = (currentIndex + 1) % colors.length;

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                cardElement.style.background = colors[nextIndex];
            });
        } else {
            cardElement.style.background = colors[nextIndex];
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
window.copyCodeToClipboard = copyCodeToClipboard;
