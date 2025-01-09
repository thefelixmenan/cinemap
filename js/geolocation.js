document.getElementById('geolocate-button').addEventListener('click', function() {
    console.log('Geolocate button clicked');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Geolocation successful');
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`Latitude: ${lat}, Longitude: ${lon}`);
            fetchAddressFromCoordinates(lat, lon);
        }, function(error) {
            console.error('Geolocation error:', error.message);
            document.getElementById('error-message').textContent = 'Erreur de géolocalisation: ' + error.message;
        });
    } else {
        console.error('Geolocation not supported');
        document.getElementById('error-message').textContent = 'La géolocalisation n\'est pas supportée par ce navigateur.';
    }
});

function fetchAddressFromCoordinates(lat, lon) {
    console.log(`Fetching address for coordinates: ${lat}, ${lon}`);
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Address data:', data);
            if (data.features.length > 0) {
                const address = data.features[0].properties.label;
                console.log('Address found:', address);
                document.getElementById('address-search').value = address;
            } else {
                console.error('No address found');
                document.getElementById('error-message').textContent = 'Adresse non trouvée.';
            }
        })
        .catch(error => {
            console.error('Error fetching address:', error.message);
            document.getElementById('error-message').textContent = 'Erreur lors de la récupération de l\'adresse: ' + error.message;
        });
}