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

  resizeSubscription: Subscription;

  mymap: any = null;
  selectedCircle: any;
  listCircles: Array<any>;

  constructor(private dataRefinerService: DataRefinerService) { }

  ngOnInit() {
    this.bureauxSubscription = this.dataRefinerService.bureauxSubject.subscribe(
      (refinedData: any) => {
        this.bureaux = refinedData;
        if (!this.dataRefinerService.getMapInitialized()) {
          this.init();
        }
        else {
          this.mapRefresh();
        }
      }
    );
  }


  init() {
    setTimeout(() => {this.mapInit()}, 1000);
    this.dataRefinerService.setMapInitialized();
    this.dataRefinerService.changeSpecificData("P17","1","vi",null,null);
    this.dataRefinerService.fetchSpecificData();
  }

  mapInit() {

    this.mapRemove();
    this.mymap = L.map('map').setView([48.111707, -1.675811], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    this.listCircles = new Array();

    for (let i = 0; i < this.bureaux.length; i++) {
      this.listCircles.push(L.circle(this.bureaux[i].point, {
        color: '#0000c1',
        weight: 1,
        fillOpacity: 0.4,
        radius: 70
      }));
      this.listCircles[i].addTo(this.mymap);
      this.listCircles[i].on('click',(e) => {this.dataRefinerService.changeBureauxSelected(this.bureaux[i].nom)} );

      var popup = L.popup();
      this.listCircles[i].on('mouseover',(e) => {popup
                                                    .setLatLng(e.latlng)
                                                    .setContent(this.bureaux[i].nom)
                                                    .openOn(this.mymap);} );
    }
  }

  mapRefresh() {
    if (this.selectedCircle != null) {
      this.mymap.removeLayer(this.selectedCircle);
      this.selectedCircle = null;
    }
    for (let i = 0; i < this.bureaux.length; i++) {
      if (this.bureaux[i].selected) {
        this.selectedCircle = L.circle(this.bureaux[i].point, {
          color: '#af0000',
          weight: 1,
          fillOpacity: 1,
          radius: 80
        });
        this.selectedCircle.addTo(this.mymap);
      }
    }
  }

  mapRemove() {
    if (this.mymap) {
      this.mymap.off();
      this.mymap.remove();
      this.mymap = null;
    }
  }

}
