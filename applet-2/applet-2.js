
class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }
  
    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }
  
    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }
  
    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
  }
  
  const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);
  
  /*
  myMap.addMarker(8.368058, 124.866334, 'Manolo Fortich Centennial Plaza');
  myMap.addMarker(8.368171, 124.866712,'Manolo Fortich Public Gymnasium');
  myMap.addMarker( 8.368307, 124.865853, 'Our Lady of the Immaculate Conception Church');
  */
  
  myMap.loadMarkersFromJson('applet-2.json');
    
    
  