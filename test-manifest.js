// Test script to verify the manifest-based slide system
async function testManifestSystem() {
    console.log('🧪 Testing Manifest-Based Slide System...\n');
    
    try {
        // Test 1: Load manifest
        console.log('📋 Test 1: Loading manifest...');
        const response = await fetch('slides/manifest.json');
        if (!response.ok) {
            throw new Error(`Failed to load manifest: ${response.status}`);
        }
        
        const manifest = await response.json();
        console.log('✅ Manifest loaded successfully');
        console.log(`   Title: ${manifest.presentation.title}`);
        console.log(`   Author: ${manifest.presentation.author}`);
        console.log(`   Total slides defined: ${manifest.slides.length}`);
        
        // Test 2: Check enabled slides
        console.log('\n🎯 Test 2: Checking enabled slides...');
        const enabledSlides = manifest.slides.filter(slide => slide.enabled);
        console.log(`✅ Enabled slides: ${enabledSlides.length}/${manifest.slides.length}`);
        
        // Test 3: Verify slide files exist
        console.log('\n📁 Test 3: Verifying slide files...');
        let successCount = 0;
        let failCount = 0;
        
        for (const slide of enabledSlides) {
            try {
                const slideResponse = await fetch(`slides/${slide.file}`);
                if (slideResponse.ok) {
                    console.log(`✅ ${slide.id}: ${slide.file} (${slide.title})`);
                    successCount++;
                } else {
                    console.log(`❌ ${slide.id}: ${slide.file} - HTTP ${slideResponse.status}`);
                    failCount++;
                }
            } catch (error) {
                console.log(`❌ ${slide.id}: ${slide.file} - ${error.message}`);
                failCount++;
            }
        }
        
        // Test 4: Check sections
        console.log('\n🏷️ Test 4: Checking sections...');
        if (manifest.sections) {
            console.log(`✅ Sections defined: ${manifest.sections.length}`);
            manifest.sections.forEach(section => {
                const slidesInSection = enabledSlides.filter(slide => slide.section === section.id);
                console.log(`   ${section.title}: ${slidesInSection.length} slides`);
            });
        } else {
            console.log('⚠️ No sections defined in manifest');
        }
        
        // Test 5: Validate slide order and IDs
        console.log('\n🔢 Test 5: Validating slide structure...');
        const slideIds = enabledSlides.map(slide => slide.id);
        const uniqueIds = new Set(slideIds);
        
        if (slideIds.length === uniqueIds.size) {
            console.log('✅ All slide IDs are unique');
        } else {
            console.log('❌ Duplicate slide IDs found!');
        }
        
        // Summary
        console.log('\n📊 Test Summary:');
        console.log(`   Manifest: ✅ Loaded`);
        console.log(`   Enabled slides: ${enabledSlides.length}`);
        console.log(`   Files accessible: ${successCount}/${enabledSlides.length}`);
        console.log(`   Sections: ${manifest.sections ? manifest.sections.length : 0}`);
        
        if (failCount === 0) {
            console.log('\n🎉 All tests passed! Manifest system is working correctly.');
        } else {
            console.log(`\n⚠️ ${failCount} issues found. Please check the failed files.`);
        }
        
        return {
            success: failCount === 0,
            manifest,
            enabledSlides,
            successCount,
            failCount
        };
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        return { success: false, error: error.message };
    }
}

// Run the test
testManifestSystem().then(result => {
    if (result.success) {
        console.log('\n✨ Manifest-based architecture is ready to use!');
    } else {
        console.log('\n🔧 Please fix the issues before proceeding.');
    }
});
