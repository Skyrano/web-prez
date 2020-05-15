import { Subscription, Subject } from 'rxjs';
import { HttpClientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable()

export class DataRefinerService {

  rawDataSubscription: Subscription;

  fullData: any;

  bureaux: Array<any>;

  fullDataSubject = new Subject<any>();

  bureauxSubject = new Subject<Array<any>>();



  constructor(private httpClientService: HttpClientService) {
    this.rawDataSubscription = this.httpClientService.rawDataSubject.subscribe(
      (serverdata: any) => {
        this.refineData(serverdata);
        this.emitAllData();
      }
    );
    this.httpClientService.loadDataFromServer();
  }

  emitAllData() {
    this.fullDataSubject.next(this.fullData);
    this.bureauxSubject.next(this.bureaux);
  }

  fetchData() {
    this.httpClientService.loadDataFromServer();
    this.emitAllData();
  }

  refineData(rawdata: any) {
    this.fullData = rawdata;
    this.bureaux = new Array();

    for (let i = 0; i < 10 ; i++) {
      if (rawdata.records[i].fields.hasOwnProperty('geo_point')) {
        this.bureaux.push(rawdata.records[i].fields.geo_point);
      }
    }





  }

}
