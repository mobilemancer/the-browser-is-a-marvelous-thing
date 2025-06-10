let currentSlideIndex = 0;
let manifest = null;
let enabledSlides = [];
const slideContainer = document.getElementById('slideContainer');

// Cache for loaded slides
const slideCache = new Map();

// Load the manifest
async function loadManifest() {
    try {
        const response = await fetch('slides/manifest.json');
        if (!response.ok) {
            throw new Error('Failed to load manifest');
        }
        manifest = await response.json();

        // Filter enabled slides
        enabledSlides = manifest.slides.filter(slide => slide.enabled);

        // Update total slides display
        document.getElementById('totalSlides').textContent = enabledSlides.length;

        return manifest;
    } catch (error) {
        console.error('Error loading manifest:', error);
        return null;
    }
}

async function loadSlide(slideIndex) {
    const slide = enabledSlides[slideIndex];
    if (!slide) {
        return `<h2>Error</h2><p>Slide not found at index ${slideIndex}</p>`;
    }

    const cacheKey = slide.id;

    // Check cache first
    if (slideCache.has(cacheKey)) {
        return slideCache.get(cacheKey);
    }

    try {
        const response = await fetch(`slides/${slide.file}`);
        if (!response.ok) {
            throw new Error(`Failed to load slide ${slide.id} (${slide.file})`);
        }
        const slideContent = await response.text();

        // Cache the slide content
        slideCache.set(cacheKey, slideContent);
        return slideContent;
    } catch (error) {
        console.error('Error loading slide:', error);
        return `<h2>Error Loading Slide</h2><p>Could not load "${slide.title}" (${slide.file})</p>`;
    }
}

async function showSlide(index) {
    const slide = enabledSlides[index];
    if (!slide) {
        console.error('No slide found at index:', index);
        return;
    }

    // Add loading state
    slideContainer.classList.add('loading');

    try {
        const slideContent = await loadSlide(index);
        slideContainer.innerHTML = slideContent;

        // Apply special class for final slide
        if (slide.id === 'finale') {
            slideContainer.classList.add('final-slide');
        } else {
            slideContainer.classList.remove('final-slide');
        }

        // Initialize any slide-specific JavaScript
        initializeSlideInteractions();

    } catch (error) {
        console.error('Error showing slide:', error);
        slideContainer.innerHTML = `<h2>Error</h2><p>Could not load slide "${slide.title}"</p>`;
    } finally {
        slideContainer.classList.remove('loading');
    }

    // Update slide counter (1-based display)
    document.getElementById('currentSlide').textContent = index + 1;

    // Update navigation buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === enabledSlides.length - 1;
}

function initializeSlideInteractions() {
    // Stop any existing auto-progress animation
    if (typeof stopAutoProgress === 'function') {
        stopAutoProgress();
    }

    // Re-initialize intersection observer for scroll items
    const scrollItems = document.querySelectorAll('.scroll-item');
    if (scrollItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        scrollItems.forEach(item => observer.observe(item));
    }

    // Check if this is the progress slide and start auto-animation
    const installProgress = document.getElementById('install');
    if (installProgress && typeof startAutoProgress === 'function') {
        // Small delay to ensure the slide is fully loaded
        setTimeout(() => {
            startAutoProgress();
        }, 100);
    }
}

function nextSlide() {
    if (currentSlideIndex < enabledSlides.length - 1) {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }
}

function previousSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    }
});

// Preload next slide for better performance
function preloadNextSlide() {
    if (currentSlideIndex < enabledSlides.length - 1) {
        loadSlide(currentSlideIndex + 1); // Preload next slide
    }
}

// Initialize - load manifest and first slide
document.addEventListener('DOMContentLoaded', async () => {
    await loadManifest();
    await showSlide(0);
    preloadNextSlide();
});

// Preload next slide when navigating
const originalNextSlide = nextSlide;
nextSlide = function () {
    originalNextSlide();
    preloadNextSlide();
};