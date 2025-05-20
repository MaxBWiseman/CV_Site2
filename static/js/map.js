async function initMap() {
    // Make sure the map div exists before trying to initialize
    const mapDiv = document.getElementById("map");
    if (!mapDiv) {
        console.warn("Map div not found, skipping map initialization");
        return;
    }

    console.log("Initializing Google Map...");
    
    try {
        const map = new google.maps.Map(mapDiv, {
            zoom: 4,
            center: { lat: 50.75000000, lng: -3.75000000 },
        });

        const markers = [
            {
                position: { lat: 50.75000000, lng: -3.75000000 },
                icon: "https://1drv.ms/i/c/17800d23338d1269/IQOmfmaO_eGLTYy90u269wztAVKmfn9y34X5ZZ3Sg8PLXPo?width=30",
                title: "My Home, Devon",
                content: '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h2 id="firstHeading" class="firstHeading">My Home, Devon</h2>' +
                    '<div id="bodyContent">' +
                    "<p><b>About:</b> Being a software developer in <b>Devon, UK,</b> offers a great work-life balance" +
                    ", though I am keen to explore as there is more to life than my home. Expanding my horizons will broaden my oppertunities" +
                    "</div>" +
                    "</div>",
            },
        ];

        const infowindow = new google.maps.InfoWindow();

        markers.forEach((markerData) => {
            const marker = new google.maps.Marker({
                position: markerData.position,
                map,
                icon: markerData.icon,
                title: markerData.title,
            });

            marker.addListener("click", () => {
                infowindow.setContent(markerData.content);
                infowindow.open({
                    anchor: marker,
                    map,
                });
            });
        });
    } catch (error) {
        console.error("Error initializing map:", error);
    }
}

// Make the function globally available
window.initMap = initMap;