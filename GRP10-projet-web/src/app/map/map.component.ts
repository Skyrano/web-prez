import { Component, OnInit } from '@angular/core';
declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      //----Fonctions d'exemple d'utilisation de la map, c'est pas compliqué à utiliser, ca devrait pas être dur de ping des bureaux cliquables sur la carte (faudra juste chopper les coordonnées dans le JSON)
      var mymap = L.map('map').setView([48.111707, -1.675811], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap);

      var marker = L.marker([48.111707, -1.675811]).addTo(mymap);

      var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);

    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
    ]).addTo(mymap);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup()
    .setLatLng([48.111707, -1.675811])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

    function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(mymap);
    }

    mymap.on('click', onMapClick);

}


}
