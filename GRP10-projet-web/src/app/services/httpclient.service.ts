import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class HttpClientService {


  private datalink: string = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=resultats-des-elections-presidentielles-a-rennes-depuis-2007&q=&rows=1000";

  private rawData: any;
  rawDataSubject = new Subject<any>();

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

  createLink(codeElection: string, numeroTour: string, niveauDetail: string,  nomLieu: string, candidats: Array<string>) {

    var link = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=resultats-des-elections-presidentielles-a-rennes-depuis-2007&q=&rows=1000";

    if (codeElection != null) {
      link+="&refine.code_election="+codeElection;
    }
    if (numeroTour != null) {
      link+="&refine.numero_tour="+numeroTour;
    }
    if (niveauDetail != null) {
      link+="&refine.niveau_detail="+niveauDetail;
    }
    if (nomLieu != null) {
      link+="&refine.nom_lieu="+nomLieu;
    }
    if (candidats != null) {
      for (let i = 0; i < candidats.length; i++) {
        if (candidats[i] != null && candidats[i] != "") {
          link+="&refine.candidat_"+(i+1).toString()+"="+candidats[i];
        }
      }
    }

    this.datalink = link;
  }

}
