// Test script to verify all slides load correctly
async function testAllSlides() {
    const totalSlides = 16;
    const results = [];
    
    console.log('Testing slide loading...');
    
    for (let i = 1; i <= totalSlides; i++) {
        try {
            const response = await fetch(`slides/slide${i}.html`);
            const success = response.ok;
            const size = response.headers.get('content-length') || 'unknown';
            
            results.push({
                slide: i,
                success,
                status: response.status,
                size: size
            });
            
            console.log(`Slide ${i}: ${success ? '✅' : '❌'} (${response.status}) - ${size} bytes`);
        } catch (error) {
            results.push({
                slide: i,
                success: false,
                error: error.message
            });
            console.log(`Slide ${i}: ❌ Error - ${error.message}`);
        }
    }
    
    const successful = results.filter(r => r.success).length;
    console.log(`\nTest complete: ${successful}/${totalSlides} slides loaded successfully`);
    
    return results;
}

// Run the test
testAllSlides();
