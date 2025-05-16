document.addEventListener('DOMContentLoaded', function() {
    // Get all navbar links
    const navLinks = document.querySelectorAll('.nav a');
    const contentContainer = document.getElementById('content-container');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            
            // Save map state if it exists
            let mapElement = document.getElementById('map');
            let mapExists = mapElement && window.google && window.google.maps;
            
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
                    
                    // Reinitialize map if needed and it previously existed
                    if (mapExists && typeof initMap === 'function') {
                        initMap();
                    }
                })
                .catch(error => {
                    console.error('Error loading page:', error);
                    window.location.href = url; // Fallback to normal navigation
                });
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        fetch(window.location.href)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('#content-container').innerHTML;
                contentContainer.innerHTML = newContent;
                
                if (typeof initMap === 'function') {
                    initMap();
                }
            });
    });
});