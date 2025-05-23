document.addEventListener('DOMContentLoaded', function() {
    // Get all navbar links
    const navLinks = document.querySelectorAll('.nav a');
    const contentContainer = document.getElementById('content-container');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            
            // Special handling for GitHub page - use normal navigation
            if (url.includes('/github')) {
                window.location.href = url;
                return;
            } else if (url.includes('/')) {
                window.location.href = url;
                return;
            }
            
            // Use fetch to get the page content
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    // Create a temporary element to parse the HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    
                    // Extract just the content section
                    const newContent = doc.querySelector('#content-container').innerHTML;
                    
                    // Update the content
                    contentContainer.innerHTML = newContent;
                    
                    // Update browser history
                    window.history.pushState({path: url}, '', url);
                    
                    // Check if we need to load Google Maps
                    const hasMapElement = document.getElementById('map');
                    if (hasMapElement) {
                        // Get any Google Maps script in the new content
                        const googleMapsScripts = Array.from(doc.querySelectorAll('script'))
                            .filter(script => script.textContent.includes('loadGoogleMapsAPI'));
                        
                        if (googleMapsScripts.length > 0) {
                            // Execute the Google Maps loading script
                            const script = document.createElement('script');
                            script.textContent = googleMapsScripts[0].textContent;
                            document.head.appendChild(script);
                        } else {
                            // If no script found but we have a map div, try to initialize directly
                            if (window.google && window.google.maps && typeof initMap === 'function') {
                                setTimeout(initMap, 200); // Small delay to ensure DOM is ready
                            }
                        }
                    }
                    
                    // Process any other scripts in the loaded content
                    const scripts = Array.from(doc.querySelectorAll('script'))
                        .filter(script => !script.textContent.includes('loadGoogleMapsAPI'));
                    
                    scripts.forEach(script => {
                        const newScript = document.createElement('script');
                        if (script.src) {
                            newScript.src = script.src;
                        } else {
                            newScript.textContent = script.textContent;
                        }
                        document.head.appendChild(newScript);
                    });
                })
                .catch(error => {
                    console.error('Error loading page:', error);
                    window.location.href = url; // Fallback to normal navigation
                });
        });
    });
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        // If we're on the GitHub page, reload completely
        if (window.location.href.includes('/github') || window.location.href.includes('/')) {
            window.location.reload();
            return;
        }
        
        fetch(window.location.href)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('#content-container').innerHTML;
                contentContainer.innerHTML = newContent;
                
                // Check if we need to initialize map
                if (document.getElementById('map') && typeof initMap === 'function') {
                    setTimeout(initMap, 200);
                }
            });
    });
});