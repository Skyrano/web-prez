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

  mymap: any = null;

  constructor(private dataRefinerService: DataRefinerService) { }

  ngOnInit() {
    this.bureauxSubscription = this.dataRefinerService.bureauxSubject.subscribe(
      (refinedData: any) => {
        this.bureaux = refinedData;
        if (!this.dataRefinerService.getMapInitialized()) {
          this.init();
        }
        this.mapRefresh();
      }
    );
  }


  init() {
    this.mapInit();
    this.dataRefinerService.setMapInitialized();
    this.dataRefinerService.changeSpecificData("P17","1","vi",null,null);
    this.dataRefinerService.fetchSpecificData();
  }


  mapInit() {
    if (this.mymap != null) {
      this.mymap.off();
      this.mymap.remove();
    }
    this.mymap = L.map('map').setView([48.111707, -1.675811], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);
  }

  mapRefresh() {
    for (let i = 0; i < this.bureaux.length; i++) {
      if (this.bureaux[i].selected) {
        L.circle(this.bureaux[i].point, {
          color: 'red',
          weight: 1,
          fillOpacity: 0.5,
          radius: 50
        }).addTo(this.mymap);

        L.polygon(this.bureaux[i].polygone, {
          color: 'red',
          weight: 1,
          fillOpacity: 0}).addTo(this.mymap);
      }
      else {
        L.circle(this.bureaux[i].point, {
          color: 'blue',
          weight: 1,
          fillOpacity: 0.5,
          radius: 50
        }).addTo(this.mymap);
      }
    }
  }
  }
