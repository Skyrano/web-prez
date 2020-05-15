import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class HttpClientService {

  rawDataSubject = new Subject<any>();

  private datalink: string = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=resultats-des-elections-presidentielles-a-rennes-depuis-2007&q=&facet=code_election&facet=nom_election&facet=numero_tour&facet=niveau_detail&facet=nom_lieu&facet=candidat_1&facet=candidat_2&facet=candidat_3&facet=candidat_4&facet=candidat_5&facet=candidat_6&facet=candidat_7&facet=candidat_8&facet=candidat_9&facet=candidat_10&facet=candidat_11&facet=candidat_12";

  private rawData: any;

  constructor(private httpClient: HttpClient) {}

  emitRawData() {
    this.rawDataSubject.next(this.rawData);
  }

  loadDataFromServer() {
    this.httpClient.get(this.datalink).subscribe(
      (response) => {
        this.rawData = response;
        this.emitRawData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}