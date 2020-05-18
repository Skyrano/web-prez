import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRefinerService } from '../services/dataRefiner.service';
declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  bureaux: Array<any>;
  bureauxSubscription: Subscription;

  polygones: Array<any>;
  polygonesSubscription: Subscription;

  mymap: any;

  constructor(private dataRefinerService: DataRefinerService) { }


  ngOnInit() {
      this.bureauxSubscription = this.dataRefinerService.bureauxSubject.subscribe(
        (refinedData: any) => {
          this.bureaux = refinedData;
          if (this.polygones != null) {
            this.mapInit();
          }
        }
      );
      this.polygonesSubscription = this.dataRefinerService.polygonesSubject.subscribe(
        (refinedData: any) => {
          this.polygones = refinedData;
          if (this.bureaux != null) {
            this.mapInit();
          }
        }
      );
      }


  mapInit() {

    this.mymap = L.map('map').setView([48.111707, -1.675811], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    for (let i = 0; i < this.bureaux.length; i++) {
      L.circle(this.bureaux[i], {
        color: 'blue',
        weight: 1,
        fillOpacity: 0.5,
        radius: 50
      }).addTo(this.mymap);
    }

    for (let i = 0; i < this.polygones.length; i++) {
      if (this.polygones[i][0].length < 3) {
        L.polygon(this.polygones[i], {
          color: 'red',
          weight: 1,
          fillOpacity: 0}).addTo(this.mymap);
      }
      else {
        for (let j = 0; j < this.polygones[i][0].length.length; j++) {
          L.polygon(this.polygones[i][j], {
            color: 'red',
            weight: 1,
            fillOpacity: 0}).addTo(this.mymap);
        }
      }
    }

  }

}
