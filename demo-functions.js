// Demo functions for the presentation
window.demoFunctions = {
    demoFileAPI: async function () {
        try {
            // Show file picker to open a text file
            const [fileHandle] = await window.showOpenFilePicker({
                types: [{
                    description: 'Text files',
                    accept: {
                        'text/plain': ['.txt'],
                        'text/markdown': ['.md'],
                        'text/javascript': ['.js'],
                        'text/css': ['.css'],
                        'text/html': ['.html']
                    }
                }],
                multiple: false
            });

            // Read the file
            const file = await fileHandle.getFile();
            const contents = await file.text();

            // Update the demo interface to show the file contents
            window.demoFunctions.updateFileAPIDemo(file.name, contents, fileHandle);

        } catch (error) {
            if (error.name === 'AbortError') {
                // User cancelled the file picker
                console.log('File selection cancelled');
            } else {
                console.error('Error reading file:', error);
                alert('Error reading file: ' + error.message);
            }
        }
    },

    updateFileAPIDemo: function (fileName, contents, fileHandle) {
        const demoContainer = document.querySelector('.file-api-demo');
        if (!demoContainer) return;

        // Create or update the demo interface
        demoContainer.innerHTML = `
            <div class="file-input" onclick="window.demoFunctions.demoFileAPI()">
                📁 Click to open another file
            </div>
            <div class="file-display">
                <div class="file-header">
                    <strong>📄 ${fileName}</strong>
                    <button class="save-btn" onclick="window.demoFunctions.saveFileAPI()">💾 Save As</button>
                </div>
                <textarea class="file-content" rows="8" placeholder="File contents will appear here...">${contents}</textarea>
                <div class="file-info">
                    <small>File size: ${contents.length} characters | You can edit the content above and save it!</small>
                </div>
            </div>
        `;

        // Store the current file handle for saving
        window.currentFileHandle = fileHandle;
    },

    saveFileAPI: async function () {
        try {
            const textarea = document.querySelector('.file-content');
            if (!textarea) return;

            const content = textarea.value;

            // Show save file picker
            const fileHandle = await window.showSaveFilePicker({
                types: [{
                    description: 'Text files',
                    accept: {
                        'text/plain': ['.txt'],
                        'text/markdown': ['.md'],
                        'text/javascript': ['.js'],
                        'text/css': ['.css'],
                        'text/html': ['.html']
                    }
                }],
                suggestedName: 'edited-file.txt'
            });

            // Create a writable stream and write content
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();

            // Show success feedback
            const fileInfo = document.querySelector('.file-info');
            if (fileInfo) {
                fileInfo.innerHTML = `<small style="color: #4ade80;">✅ File saved successfully! | Size: ${content.length} characters</small>`;
                setTimeout(() => {
                    fileInfo.innerHTML = `<small>File size: ${content.length} characters | You can edit the content above and save it!</small>`;
                }, 3000);
            }

        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error saving file:', error);
            }
        }
    },

    demoViewTransition: function () {
        const states = ['cardState', 'listState', 'profileState'];

        // Find current active state
        let currentIndex = 0;
        for (let i = 0; i < states.length; i++) {
            const state = document.getElementById(states[i]);
            if (state && state.classList.contains('active')) {
                currentIndex = i;
                break;
            }
        }

        // Get next state
        const nextIndex = (currentIndex + 1) % states.length;
        const currentState = document.getElementById(states[currentIndex]);
        const nextState = document.getElementById(states[nextIndex]);

        if (!currentState || !nextState) return;

        // Perform the transition
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                currentState.classList.remove('active');
                nextState.classList.add('active');
            });
        } else {
            currentState.classList.remove('active');
            nextState.classList.add('active');
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
        const layerButton = document.getElementById('layerButton');

        if (demoCard) {
            // Toggle the highlight class to show utility layer priority
            demoCard.classList.toggle('highlight-box');
        }
        if (layerButton) {
            // Toggle button highlight to show layer priority beats specificity
            layerButton.classList.toggle('highlight-btn');
        }
    },

    demoDevTools: function () {
        // Clear console for dramatic effect
        console.clear();

        // Epic header with enhanced neon styling
        const headerStyle = 'background: linear-gradient(45deg, #8b5cf6, #a855f7, #c084fc, #d946ef); color: #f3e8ff; font-weight: bold; padding: 16px 32px; border-radius: 16px; text-shadow: 0 0 15px #8b5cf6, 0 0 30px #8b5cf6, 0 0 45px #8b5cf6; box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), inset 0 0 30px rgba(139, 92, 246, 0.3); font-size: 2.2em; letter-spacing: 3px; text-transform: uppercase;';
        console.log('%c🚀 DEVTOOLS SUPERPOWERS ACTIVATED! 🚀', headerStyle);

        // Cool ASCII art with neon glow
        const asciiStyle = 'color: #a855f7; font-family: monospace; font-size: 1.1em; text-shadow: 0 0 15px #8b5cf6; line-height: 1.2;';
        console.log('%c' + `
    ╔═════════════════════════════════╗
    ║   🌟 BROWSER CAPABILITIES 🌟   ║
    ║         ⚡ UNLOCKED ⚡         ║
    ╚═════════════════════════════════╝`, asciiStyle);

        // Enhanced table with emojis and power levels
        const tableStyle = 'background: linear-gradient(45deg, #8b5cf6, #a855f7, #c084fc); color: #f3e8ff; font-weight: bold; padding: 12px 24px; border-radius: 12px; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6; box-shadow: 0 0 25px rgba(139, 92, 246, 0.6), inset 0 0 25px rgba(139, 92, 246, 0.2); font-size: 1.6em; letter-spacing: 2px;';
        console.log('%c🎯 FEATURE ANALYSIS MATRIX', tableStyle);

        console.table([
            { '🎯 Feature': 'CSS Grid Inspector', '⚡ Status': '✅ ONLINE', '🔥 Power': '9000', '💎 Rarity': 'LEGENDARY' },
            { '🎯 Feature': 'Container Queries Debug', '⚡ Status': '✅ ONLINE', '🔥 Power': '8500', '💎 Rarity': 'EPIC' },
            { '🎯 Feature': 'Performance Profiling', '⚡ Status': '✅ ONLINE', '🔥 Power': '9500', '💎 Rarity': 'LEGENDARY' },
            { '🎯 Feature': 'View Transitions Debug', '⚡ Status': '✅ ONLINE', '🔥 Power': '10000', '💎 Rarity': 'MYTHIC' },
            { '🎯 Feature': 'File System Access', '⚡ Status': '✅ ONLINE', '🔥 Power': '8000', '💎 Rarity': 'RARE' }
        ]);

        // Performance timing with enhanced styling
        const timeStyle = 'background: linear-gradient(45deg, #8b5cf6, #a855f7, #c084fc); color: #f3e8ff; font-weight: bold; padding: 12px 24px; border-radius: 12px; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6; box-shadow: 0 0 25px rgba(139, 92, 246, 0.6), inset 0 0 25px rgba(139, 92, 246, 0.2); font-size: 1.6em; letter-spacing: 2px;';
        console.log('%c⚡ PERFORMANCE SPEED TEST INITIATED', timeStyle);
        console.time('⚡ DEMO OPERATION SPEED TEST');

        // Organized output with groups
        console.group('%c🔍 SYSTEM DIAGNOSTICS SUITE', 'color: #c084fc; font-weight: bold; font-size: 1.4em; text-shadow: 0 0 10px #8b5cf6;');

        setTimeout(() => {
            console.timeEnd('⚡ DEMO OPERATION SPEED TEST');

            // Memory analysis with enhanced styling
            const memoryStyle = 'background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8);';
            console.log('%c💾 MEMORY ANALYSIS COMPLETE:', memoryStyle);
            console.log('📊 Performance memory:', performance.memory);

            // Browser intelligence
            const browserStyle = 'background: linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8);';
            console.log('%c🌐 BROWSER INTELLIGENCE REPORT:', browserStyle);
            console.log('🔍 User Agent:', navigator.userAgent.split(' ').slice(-2).join(' '));
            console.log('📐 Viewport Dimensions:', `${window.innerWidth}x${window.innerHeight}px`);
            console.log('🎨 Color Depth:', screen.colorDepth + ' bits');
            console.log('🖥️ Screen Resolution:', `${screen.width}x${screen.height}px`);

            // Network diagnostics
            if (navigator.connection) {
                const networkStyle = 'background: linear-gradient(90deg, #10b981, #8b5cf6, #f59e0b); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8);';
                console.log('%c📡 NETWORK STATUS ANALYSIS:', networkStyle);
                console.log('🚀 Connection Type:', navigator.connection.effectiveType);
                console.log('⬇️ Downlink Speed:', navigator.connection.downlink + ' Mbps');
                console.log('📶 Round Trip Time:', navigator.connection.rtt + ' ms');
            }

            // Hardware acceleration check
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const hardwareStyle = 'background: linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; text-shadow: 0 0 10px rgba(139, 92, 246, 0.8);';
                console.log('%c🎮 GPU ACCELERATION STATUS:', hardwareStyle);
                console.log('🔥 WebGL Renderer:', gl.getParameter(gl.RENDERER));
                console.log('⚡ WebGL Vendor:', gl.getParameter(gl.VENDOR));
            }

            console.groupEnd();

            // Epic finale
            const finaleStyle = 'background: linear-gradient(45deg, #f59e0b, #ef4444, #8b5cf6, #06b6d4, #10b981); color: white; font-weight: bold; padding: 20px 40px; border-radius: 20px; text-shadow: 0 0 25px rgba(139, 92, 246, 0.9); box-shadow: 0 0 50px rgba(139, 92, 246, 0.7); font-size: 2em; letter-spacing: 2px; text-transform: uppercase;';
            console.log('%c🎉 THE BROWSER IS TRULY MARVELOUS! 🎉', finaleStyle);

            // Dramatic warnings and errors for effect
            console.warn('⚠️  WARNING: Excessive awesomeness levels detected in browser capabilities! ⚠️');
            console.error('🚨 CRITICAL: Mind-blowing features may cause uncontrollable excitement! 🚨');

        }, 200);

        alert('🎭 Open DevTools (F12) to witness the EPIC browser capabilities showcase! 🎭');
    },



    // Auto-animating progress for slide load
    startAutoProgress: function () {
        const installProgress = document.getElementById('install');
        const installText = installProgress ? installProgress.nextElementSibling : null;

        if (!installProgress || !installText) return;

        let currentValue = 0;
        let animationId = null;

        const animateToHundred = () => {
            if (currentValue < 100) {
                // Random increment between 1-5
                const increment = Math.floor(Math.random() * 5) + 1;
                currentValue = Math.min(currentValue + increment, 100);

                installProgress.value = currentValue;
                installText.textContent = `${currentValue}%`;

                // Random delay between 100-300ms for natural feel
                const delay = Math.floor(Math.random() * 200) + 100;
                animationId = setTimeout(animateToHundred, delay);
            } else {
                // Wait 10 seconds at 100%, then restart
                animationId = setTimeout(() => {
                    currentValue = 0;
                    installProgress.value = 0;
                    installText.textContent = '0%';
                    // Start again after a brief pause
                    setTimeout(animateToHundred, 500);
                }, 10000);
            }
        };

        // Store animation ID for cleanup
        window.progressAnimationId = animationId;

        // Start the animation
        animateToHundred();
    },

    stopAutoProgress: function () {
        if (window.progressAnimationId) {
            clearTimeout(window.progressAnimationId);
            window.progressAnimationId = null;
        }
    },

    // CSS if() function demo
    toggleIfTheme: function () {
        let ifCurrentTheme = window.ifCurrentTheme || 'default';
        const ifThemes = ['default', 'dark', 'light'];

        const currentIndex = ifThemes.indexOf(ifCurrentTheme);
        const nextIndex = (currentIndex + 1) % ifThemes.length;
        ifCurrentTheme = ifThemes[nextIndex];

        const card = document.getElementById('ifDemoCard');
        const themeDisplay = document.getElementById('ifCurrentTheme');

        if (!card || !themeDisplay) return;

        // Remove all theme attributes
        card.removeAttribute('data-theme');

        // Set new theme
        if (ifCurrentTheme !== 'default') {
            card.setAttribute('data-theme', ifCurrentTheme);
        }

        themeDisplay.textContent = ifCurrentTheme;

        // Add visual feedback
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);

        // Store current theme globally
        window.ifCurrentTheme = ifCurrentTheme;
    },

    // Initialize CSS if() function demo
    initializeIfDemo: function () {
        const ifDemoCard = document.getElementById('ifDemoCard');
        if (ifDemoCard) {
            // Initialize theme display
            const themeDisplay = document.getElementById('ifCurrentTheme');
            if (themeDisplay) {
                window.ifCurrentTheme = 'default';
                themeDisplay.textContent = 'default';
            }
        }
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
window.saveFileAPI = window.demoFunctions.saveFileAPI;
window.demoViewTransition = window.demoFunctions.demoViewTransition;
window.demoDevTools = window.demoFunctions.demoDevTools;
window.transitionCard = window.demoFunctions.transitionCard;
window.transitionHeroCard = window.demoFunctions.transitionHeroCard;
window.toggleLayerHighlight = window.demoFunctions.toggleLayerHighlight;
window.resetLayerDemo = window.demoFunctions.resetLayerDemo;

window.startAutoProgress = window.demoFunctions.startAutoProgress;
window.stopAutoProgress = window.demoFunctions.stopAutoProgress;
window.toggleIfTheme = window.demoFunctions.toggleIfTheme;
window.copyCodeToClipboard = copyCodeToClipboard;
