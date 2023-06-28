// Hide the splash screen when the page finishes loading
window.addEventListener('load', () => {
    const splash = document.querySelector('#splash');
    splash.style.display = 'none';
  });
  
    // Create the map
    const map = L.map('map').setView([37.7749, -122.4194], 13);

    // Add the OpenStreetMap tiles
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define the search location
    const searchLocation = 'San Francisco, CA';

    // Define the search query
    const query = 'mechanic';

    // Define the API endpoint
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=YOUR_API_KEY&limit=10&min_confidence=6&proximity=${searchLocation}`;

    // Fetch the search results from the API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Loop through the search results and create markers
        data.results.forEach(result => {
          const marker = L.marker([result.geometry.lat, result.geometry.lng]).addTo(map);
          marker.bindPopup(`<b>${result.formatted}</b><br>${result.components.category}`);
        });
      })
      .catch(error => console.log(error));