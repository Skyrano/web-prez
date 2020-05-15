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


  bureauxSubscription: Subscription;

  bureaux: Array<any>;

  mymap: any;

  constructor(private dataRefinerService: DataRefinerService) { }


  ngOnInit() {
      this.bureauxSubscription = this.dataRefinerService.bureauxSubject.subscribe(
        (refinedData: any) => {
          this.bureaux = refinedData;
          this.mapInit();
        }
      );
      }


  mapInit() {

    this.mymap = L.map('map').setView([48.111707, -1.675811], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);



    for (let i = 0; i < this.bureaux.length; i++) {
      console.log(this.bureaux[i]);
      L.circle(this.bureaux[i], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.01,
        radius: 50
      }).addTo(this.mymap);
    }
  }

}
