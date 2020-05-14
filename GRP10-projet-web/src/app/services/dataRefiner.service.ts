import { Subscription, Subject } from 'rxjs';
import { HttpClientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable()

export class DataRefinerService {

  rawDataSubscription: Subscription;

  dataSubject = new Subject<any>();

  data: any;

  constructor(private httpClientService: HttpClientService) {
    this.rawDataSubscription = this.httpClientService.rawDataSubject.subscribe(
      (serverdata: any) => {
        this.data = serverdata;
        this.emitData();
      }
    );
    this.httpClientService.loadDataFromServer();
  }

  emitData() {
    this.dataSubject.next(this.data);
  }

  fetchData() {
    this.httpClientService.loadDataFromServer();
    this.emitData();
  }

}
