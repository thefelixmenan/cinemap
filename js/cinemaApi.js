let cinemaData = [];
let map;

function fetchCinemas(coordinates, distance) {
    const url = `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&q=&geofilter.distance=${coordinates.lat},${coordinates.lon},${distance * 1000}`;
    console.log('Fetching cinemas with URL:', url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Cinema data:', data);
            cinemaData = data.records || [];
            displayCinemas(cinemaData);
            displayMap(coordinates, cinemaData);
            document.querySelector('.filter-buttons').style.display = 'flex';
        })
        .catch(error => {
            console.error('Error fetching cinemas:', error.message);
            document.getElementById('error-message').textContent = 'Erreur lors de la récupération des cinémas: ' + error.message;
        });
}

function displayCinemas(records) {
    const cinemaList = document.getElementById('cinema-list');
    cinemaList.innerHTML = '';
    if (records.length > 0) {
        records.forEach(record => {
            const cinema = record.fields;
            const listItem = document.createElement('li');
            listItem.textContent = `${cinema.nom} - ${cinema.adresse} - ${cinema.code_insee || ''} ${cinema.commune || ''} - ${cinema.dist ? (cinema.dist / 1000).toFixed(2) + ' km' : ''}`;
            cinemaList.appendChild(listItem);
        });
    } else {
        document.getElementById('error-message').textContent = 'Aucun cinéma trouvé.';
        document.querySelector('.filter-buttons').style.display = 'none';
    }
}

function displayMap(center, records) {
    if (!map) {
        map = L.map('map').setView([center.lat, center.lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([center.lat, center.lon], 13);
    }

    records.forEach(record => {
        const cinema = record.fields;
        if (cinema.geolocalisation) {
            L.marker([cinema.geolocalisation[0], cinema.geolocalisation[1]])
                .addTo(map)
                .bindPopup(`<b>${cinema.nom}</b><br>${cinema.adresse}<br>${cinema.code_postal || ''} ${cinema.commune || ''}`);
        }
    });
}

document.getElementById('sort-asc-button').addEventListener('click', () => {
    cinemaData.sort((a, b) => a.fields.nom.localeCompare(b.fields.nom));
    displayCinemas(cinemaData);
});

document.getElementById('sort-desc-button').addEventListener('click', () => {
    cinemaData.sort((a, b) => b.fields.nom.localeCompare(a.fields.nom));
    displayCinemas(cinemaData);
});

document.getElementById('sort-near-button').addEventListener('click', () => {
    cinemaData.sort((a, b) => a.fields.dist - b.fields.dist);
    displayCinemas(cinemaData);
});

document.getElementById('sort-far-button').addEventListener('click', () => {
    cinemaData.sort((a, b) => b.fields.dist - a.fields.dist);
    displayCinemas(cinemaData);
});