document.addEventListener('DOMContentLoaded', function() {
    // Get all navbar links
    const navLinks = document.querySelectorAll('.nav a');
    const contentContainer = document.getElementById('content-container');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            
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
                    
                    // Update the GitHub initialization section
                    if (url.includes('/github')) {
                        console.log("Loading GitHub page via AJAX, initializing...");
                        
                        // First load jQuery if not already loaded
                        if (typeof $ === 'undefined') {
                            const jQueryScript = document.createElement('script');
                            jQueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
                            jQueryScript.onload = function() {
                                // Now load GitHub script after jQuery
                                loadGithubScript();
                            };
                            document.head.appendChild(jQueryScript);
                        } else {
                            // jQuery already loaded, just load GitHub script
                            loadGithubScript();
                        }
                    }
                    
                    function loadGithubScript() {
                        // Force reload of github.js to ensure proper initialization
                        const githubScript = document.createElement('script');
                        githubScript.src = "/static/js/github.js?v=" + new Date().getTime(); // Add cache buster
                        githubScript.onload = function() {
                            console.log("GitHub script loaded, initializing...");
                            // Use a small timeout to ensure script is fully parsed
                            setTimeout(function() {
                                if (typeof window.initGitHub === 'function') {
                                    window.initGitHub();
                                } else {
                                    console.error("initGitHub function not found!");
                                }
                            }, 100);
                        };
                        document.head.appendChild(githubScript);
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
                
                // Check if we need to initialize GitHub
                if (window.location.href.includes('/github') && typeof initGitHub === 'function') {
                    setTimeout(initGitHub, 100);
                }
            });
    });
});