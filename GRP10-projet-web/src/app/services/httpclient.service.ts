import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable() //ce service sera utilisé ailleurs et doit donc être injectable dans un autre component

//Ce service permet d'envoyer et recevoir la réponse du serveur de Rennes Métropole
export class HttpClientService {

  //on déclare le lien de l'API initial
  private datalink: string = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=resultats-des-elections-presidentielles-a-rennes-depuis-2007&q=&rows=1000";

  private rawData: any;  //contiendra les données brutes recueillies avec l'API
  rawDataSubject = new Subject<any>(); //sujet pour emmetre les données brutes

  constructor(private httpClient: HttpClient) {} //on utilise le client http d'Angular Common

  emitRawData() {
    this.rawDataSubject.next(this.rawData);
  }

  loadDataFromServer() {
    console.log(this.datalink);
    this.httpClient.get(this.datalink).subscribe(
      (response) => {   //quand on recoit une réponse, on émet celles-ci avec le sujet des données brutes
        this.rawData = response;
        console.log(response);
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
