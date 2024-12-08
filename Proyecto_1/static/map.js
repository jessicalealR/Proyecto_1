document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([5.7145, -72.9333], 13); // Centro en Sogamoso

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    fetch('/get_reports')
        .then(response => response.json())
        .then(reports => {
            reports.forEach(report => {
                const location = JSON.parse(report[1]);
                const marker = L.marker(location).addTo(map);
                marker.bindPopup(`<b>${report[0]}</b><br>${report[2]}<br>${report[3]}`);
            });
        });

    map.on('click', function (e) {
        const location = e.latlng;
        const description = prompt("Describe el incidente:");
        if (description) {
            fetch('/add_report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description,
                    location: JSON.stringify(location),
                    type: "incidente"
                })
            });
        }
    });
});
