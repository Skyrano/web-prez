import { Subscription, Subject } from 'rxjs';
import { HttpClientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable()

export class DataRefinerService {

  rawDataSubscription: Subscription;
  mapInitialized : boolean = false;

  fullData: any;
  fullDataSubject = new Subject<any>();

  bureaux: Array<any>;
  bureauxSubject = new Subject<Array<any>>();

  polygones: Array<any>;
  polygonesSubject = new Subject<Array<any>>();


  constructor(private httpClientService: HttpClientService) {
    this.rawDataSubscription = this.httpClientService.rawDataSubject.subscribe(
      (serverdata: any) => {
        this.fullData = serverdata;
        if (this.mapInitialized) {
          this.emitSpecificData();
        }
        else {
          this.refineMap(serverdata);
          this.emitAllData();
        }
      }
    );
    this.httpClientService.loadDataFromServer();
  }

  emitAllData() {
    this.fullDataSubject.next(this.fullData);
    this.bureauxSubject.next(this.bureaux);
    this.polygonesSubject.next(this.polygones);
  }

  emitSpecificData() {
    this.fullDataSubject.next(this.fullData);
  }

  fetchAllData() {
    this.httpClientService.createLink(null, null, null,  null, null);
    this.httpClientService.loadDataFromServer();
  }

  fetchSpecificData(codeElection: string, numeroTour: string, niveauDetail: string,  nomLieu: string, candidats: Array<string>) {
    this.httpClientService.createLink(codeElection, numeroTour, niveauDetail,  nomLieu, candidats);
    this.httpClientService.loadDataFromServer();
  }

  refineMap(rawdata: any) {
    this.bureaux = new Array();
    var xpos = new Array();
    for (let i = 0; i < rawdata.nhits ; i++) {
      if (rawdata.records[i].fields.hasOwnProperty('geo_point') && xpos.indexOf(rawdata.records[i].fields.geo_point[0]) == -1) {
        this.bureaux.push(rawdata.records[i].fields.geo_point);
        xpos.push(rawdata.records[i].fields.geo_point[0]);
      }
    }

    this.polygones = new Array();
    xpos = new Array();

    for (let i = 0; i < rawdata.nhits ; i++) {
      if (rawdata.records[i].fields.hasOwnProperty('geo_shape') && xpos.indexOf(rawdata.records[i].fields.geo_shape.coordinates[0][0][1]) == -1) {
        var coordinates = new Array();
        for (let j = 0; j < rawdata.records[i].fields.geo_shape.coordinates[0].length; j++) {
          coordinates.push(rawdata.records[i].fields.geo_shape.coordinates[0][j].reverse());
        }
        this.polygones.push(coordinates);
        xpos.push(this.polygones[this.polygones.length-1][0][0])
      }
    }
    this.mapInitialized = true;
  }


  refineCandidats (data: any) {

  }

}
