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
        const container = document.getElementById('transitionContainer');
        if (!container) return;

        // Define the different states
        const states = [
            {
                name: 'cardState',
                html: `
                    <div class="demo-state" id="cardState">
                        <div class="demo-header" style="view-transition-name: header;">
                            <h3 style="view-transition-name: title;">🎬 Movie Database</h3>
                            <div class="demo-nav" style="view-transition-name: nav;">
                                <span>🏠 Home</span> | <span>⭐ Favorites</span>
                            </div>
                        </div>
                        <div class="movie-grid">
                            <div class="movie-card" style="view-transition-name: movie-1;">
                                <div class="movie-poster">🎭</div>
                                <h4>Drama Classic</h4>
                                <p>★★★★☆</p>
                            </div>
                            <div class="movie-card" style="view-transition-name: movie-2;">
                                <div class="movie-poster">🚀</div>
                                <h4>Sci-Fi Epic</h4>
                                <p>★★★★★</p>
                            </div>
                            <div class="movie-card" style="view-transition-name: movie-3;">
                                <div class="movie-poster">😂</div>
                                <h4>Comedy Gold</h4>
                                <p>★★★☆☆</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                name: 'listState',
                html: `
                    <div class="demo-state" id="listState">
                        <div class="demo-header" style="view-transition-name: header;">
                            <h3 style="view-transition-name: title;">📋 Movie List</h3>
                            <div class="demo-nav" style="view-transition-name: nav;">
                                <span>📊 List View</span> | <span>🔍 Search</span>
                            </div>
                        </div>
                        <div class="movie-list">
                            <div class="movie-item" style="view-transition-name: movie-1;">
                                <div class="movie-poster">🎭</div>
                                <div class="movie-details">
                                    <h4>Drama Classic</h4>
                                    <p>★★★★☆ • 2h 15m • Drama</p>
                                </div>
                            </div>
                            <div class="movie-item" style="view-transition-name: movie-2;">
                                <div class="movie-poster">🚀</div>
                                <div class="movie-details">
                                    <h4>Sci-Fi Epic</h4>
                                    <p>★★★★★ • 2h 45m • Sci-Fi</p>
                                </div>
                            </div>
                            <div class="movie-item" style="view-transition-name: movie-3;">
                                <div class="movie-poster">😂</div>
                                <div class="movie-details">
                                    <h4>Comedy Gold</h4>
                                    <p>★★★☆☆ • 1h 30m • Comedy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                name: 'profileState',
                html: `
                    <div class="demo-state" id="profileState">
                        <div class="demo-header" style="view-transition-name: header;">
                            <h3 style="view-transition-name: title;">👤 User Profile</h3>
                            <div class="demo-nav" style="view-transition-name: nav;">
                                <span>⚙️ Settings</span> | <span>🚪 Logout</span>
                            </div>
                        </div>
                        <div class="profile-view">
                            <div class="profile-avatar" style="view-transition-name: movie-1;">👤</div>
                            <h4>Movie Enthusiast</h4>
                            <p>Joined January 2024</p>
                            <div class="profile-stats">
                                <div class="stat-item" style="view-transition-name: movie-2;">
                                    <div class="stat-number">127</div>
                                    <div class="stat-label">Movies Watched</div>
                                </div>
                                <div class="stat-item" style="view-transition-name: movie-3;">
                                    <div class="stat-number">4.2</div>
                                    <div class="stat-label">Avg Rating</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">23</div>
                                    <div class="stat-label">Reviews</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        ];

        // Find current state
        let currentStateIndex = 0;
        for (let i = 0; i < states.length; i++) {
            if (container.querySelector(`#${states[i].name}`)) {
                currentStateIndex = i;
                break;
            }
        }

        // Get next state
        const nextStateIndex = (currentStateIndex + 1) % states.length;
        const nextState = states[nextStateIndex];

        // Perform the transition
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                container.innerHTML = nextState.html;
            });
        } else {
            container.innerHTML = nextState.html;
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
window.copyCodeToClipboard = copyCodeToClipboard;
