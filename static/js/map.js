async function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
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
                "<p><b>About:</b> Being a software developer in <b>Devon, UK,</b> offers a unique blend of " +
                "professional and lifestyle benefits. The region is home to a growing tech " +
                "community, with opportunities to work on innovative projects across various " +
                "industries. Companies in Exeter, Plymouth, and other parts of Devon are " +
                "increasingly seeking skilled developers, providing a fertile ground for career " +
                "growth. The picturesque landscapes and coastal beauty of Devon also " +
                "offer a serene backdrop for work-life balance, making it an ideal location for " +
                "those who appreciate both professional challenges and a quiet quality of life. " +
                "</div>" +
                "</div>",
        },
        {
            position: { lat: 51.5074, lng: -0.1278 },
            icon: "https://1drv.ms/i/c/17800d23338d1269/IQOmfmaO_eGLTYy90u269wztAVKmfn9y34X5ZZ3Sg8PLXPo?width=30",
            title: "London",
            content: '<div id="content">' +
                '<h2 id="firstHeading" class="firstHeading">London</h2>' +
                '<div id="bodyContent">' +
                "<p>London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times.</p>" +
                "</div>" +
                "</div>",
        },
        {
            position: { lat: 48.8566, lng: 2.3522 },
            icon: "https://1drv.ms/i/c/17800d23338d1269/IQOmfmaO_eGLTYy90u269wztAVKmfn9y34X5ZZ3Sg8PLXPo?width=30",
            title: "Paris",
            content: '<div id="content">' +
                '<h2 id="firstHeading" class="firstHeading">Paris</h2>' +
                '<div id="bodyContent">' +
                "<p>Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture.</p>" +
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
}

window.initMap = initMap;