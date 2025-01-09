document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const searchInput = document.querySelector('input[type="search"]');
    const rangeInput = document.querySelector('input[type="range"]');
    const geoButton = document.querySelector('button[type="button"]');
    const filterButtons = document.querySelector('.filter-buttons');

    geoButton.addEventListener('click', () => {
        getGeolocation();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const address = searchInput.value;
        const distance = rangeInput.value;
        console.log('Form submitted with address:', address, 'and distance:', distance);
        fetchCoordinates(address, (coordinates) => {
            console.log('Coordinates fetched:', coordinates);
            fetchCinemas(coordinates, distance);
        });
    });
});

document.getElementById('distance-range').addEventListener('input', function() {
    document.getElementById('distance-value').textContent = this.value + ' km';
});

// Function to get geolocation from geolocation.js
function getGeolocation() {
    // This function is already handled by the event listener in geolocation.js
}