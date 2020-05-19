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

  zones: Array<any>;
  zonesSubscription: Subscription;

  mymap: any;

  constructor(private dataRefinerService: DataRefinerService) { }


  ngOnInit() {
      this.bureauxSubscription = this.dataRefinerService.bureauxSubject.subscribe(
        (refinedData: any) => {
          this.bureaux = refinedData;
          if (this.zones != null) {
            this.mapInit();
          }
        }
      );
      this.zonesSubscription = this.dataRefinerService.zonesSubject.subscribe(
        (refinedData: any) => {
          this.zones = refinedData;
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

    for (let i = 0; i < this.zones.length; i++) {
      if (this.zones[i][0].length < 3) {
        L.polygon(this.zones[i], {
          color: 'red',
          weight: 1,
          fillOpacity: 0}).addTo(this.mymap);
      }
      else {
        for (let j = 0; j < this.zones[i][0].length.length; j++) {
          L.polygon(this.zones[i][j], {
            color: 'red',
            weight: 1,
            fillOpacity: 0}).addTo(this.mymap);
        }
      }
    }
    this.dataRefinerService.changeSpecificData("P17","1","vi",null,null);
    this.dataRefinerService.fetchSpecificData();
  }

}
