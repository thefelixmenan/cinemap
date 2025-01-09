function fetchCoordinates(address, callback) {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${address}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const coordinates = data.features[0].geometry.coordinates;
                callback({ lon: coordinates[0], lat: coordinates[1] });
            } else {
                document.getElementById('error-message').textContent = 'Adresse non trouvée.';
            }
        })
        .catch(error => {
            document.getElementById('error-message').textContent = 'Erreur lors de la récupération des coordonnées: ' + error.message;
        });
}