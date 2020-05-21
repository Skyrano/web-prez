import { Subscription, Subject } from 'rxjs';
import { HttpClientService } from './httpclient.service';
import { Injectable } from '@angular/core';

@Injectable()

export class DataRefinerService {

  rawDataSubscription: Subscription;
  mapInitialized : boolean = false;

  bureaux: Array<any>;
  bureauxSubject = new Subject<Array<any>>();

  bureauxNameList: Array<any>;
  bureauxNameListSubject = new Subject<Array<any>>();

  listeCandidats: Array<any>;
  listeCandidatsSubject = new Subject<Array<any>>();

  participation: any;
  participationSubject = new Subject<any>();

  refeshSelectTourAnneeSubject = new Subject<any>();
  refeshBureauxSubject = new Subject<any>();

  codeElection: string;
  numeroTour: string;
  niveauDetail: string;
  nomLieu: string;
  candidats: Array<string>;




  constructor(private httpClientService: HttpClientService) {
    this.rawDataSubscription = this.httpClientService.rawDataSubject.subscribe(
      (serverdata: any) => {
        if (this.getMapInitialized()) {
          this.refineParticipation(serverdata);
          this.refineCandidats(serverdata);
          this.calculPourcentageCandidats();
          this.emitSpecificData();
        }
        else {
          this.refineMap(serverdata);
          this.reinitMap();
          this.bureauxNameListSubject.next(this.bureauxNameList);
        }
      }
    );
    this.fetchAllData();
  }

  reinitMap() {
    this.changeSpecificData(null,null,null,null,null);
    this.mapInitialized = false;
    this.setBureauxSelected("Tous les bureaux")
    this.bureauxSubject.next(this.bureaux);
    this.refeshSelectTourAnneeSubject.next();
    this.refeshBureauxSubject.next();
  }

  getMapInitialized() {
    return this.mapInitialized;
  }

  setMapInitialized() {
    this.mapInitialized = true;
  }

  emitInitData() {
    this.bureauxSubject.next(this.bureaux);

  }

  emitSpecificData() {
    this.listeCandidatsSubject.next(this.listeCandidats);
    this.participationSubject.next(this.participation);
  }

  fetchAllData() {
    this.httpClientService.createLink(null, null, null,  null, null);
    this.httpClientService.loadDataFromServer();
  }

  fetchSpecificData() {
    this.httpClientService.createLink(this.codeElection, this.numeroTour, this.niveauDetail,  this.nomLieu, this.candidats);
    this.httpClientService.loadDataFromServer();
  }

  changeSpecificData(codeElection: string, numeroTour: string, niveauDetail: string,  nomLieu: string, candidats: Array<string>) {
    this.codeElection = codeElection;
    this.numeroTour = numeroTour;
    this.niveauDetail = niveauDetail;
    this.nomLieu = nomLieu;
    this.candidats = candidats;
  }

  setCodeElection(codeElection: string) {
    this.codeElection = codeElection;
  }

  setNumeroTour(numeroTour: string) {
    this.numeroTour = numeroTour;
  }

  setNiveauDetail(niveauDetail: string) {
    this.niveauDetail = niveauDetail;
  }

  setNomLieu(nomLieu: string) {
    this.nomLieu = nomLieu;
  }

  setCandidats(candidats: Array<string>) {
    this.candidats = candidats;
  }

  setBureauxSelected(bureau: string) {
    if (bureau == "Tous les bureaux") {
      this.nomLieu = null;
      this.niveauDetail = "vi";
      for (let i = 0; i < this.bureaux.length; i++) {
        this.bureaux[i].selected = false;
      }
    }
    else {
      this.nomLieu = bureau;
      this.niveauDetail = "bu";
      for (let i = 0; i < this.bureaux.length; i++) {
        if(this.bureaux[i].nom == bureau) {
          this.bureaux[i].selected = true;
        }
        else {
          this.bureaux[i].selected = false;
        }
      }
    }
    this.bureauxSubject.next(this.bureaux);
  }


  refineMap(rawdata: any) {
    this.bureaux = new Array();
    this.bureauxNameList = new Array();

    for (let i = 0; i < rawdata.nhits ; i++) {
      if (rawdata.records[i].fields.hasOwnProperty('nom_lieu') && rawdata.records[i].fields.hasOwnProperty('geo_point')) {
        let index = this.bureauxNameList.indexOf(rawdata.records[i].fields.nom_lieu);
        if (index == -1) {
          var polygone = new Array();
          for (let j = 0; j < rawdata.records[i].fields.geo_shape.coordinates[0].length; j++) {
            polygone.push(rawdata.records[i].fields.geo_shape.coordinates[0][j].reverse());
          }
          this.bureaux.push({nom: rawdata.records[i].fields.nom_lieu,
                            point: rawdata.records[i].fields.geo_point,
                            polygone: polygone,
                            selected: false});
          this.bureauxNameList.push(rawdata.records[i].fields.nom_lieu);
        }
      }
    }

    this.bureauxNameList.splice(0,0,"Tous les bureaux")
  }


  refineCandidats (data: any) {
    this.listeCandidats = new Array<any>();
    if (data.records[0].fields.hasOwnProperty('candidat_3')) {
      this.listeCandidats.push({name : data.records[0].fields.candidat_1,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_2,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_3,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_4,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_5,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_6,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_7,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_8,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_9,
        voix : 0, pourcentage: 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_10,
        voix : 0, pourcentage: 0});

      if (data.records[0].fields.hasOwnProperty('candidat_11')) {
        this.listeCandidats.push({name : data.records[0].fields.candidat_11,
          voix : 0});
          for (let i = 0; i < data.nhits; i++) {
            this.listeCandidats[0].voix += data.records[i].fields.nb_voix_1;
            this.listeCandidats[1].voix += data.records[i].fields.nb_voix_2;
            this.listeCandidats[2].voix += data.records[i].fields.nb_voix_3;
            this.listeCandidats[3].voix += data.records[i].fields.nb_voix_4;
            this.listeCandidats[4].voix += data.records[i].fields.nb_voix_5;
            this.listeCandidats[5].voix += data.records[i].fields.nb_voix_6;
            this.listeCandidats[6].voix += data.records[i].fields.nb_voix_7;
            this.listeCandidats[7].voix += data.records[i].fields.nb_voix_8;
            this.listeCandidats[8].voix += data.records[i].fields.nb_voix_9;
            this.listeCandidats[9].voix += data.records[i].fields.nb_voix_10;
            this.listeCandidats[10].voix += data.records[i].fields.nb_voix_11;
          }
      }
      else {
        for (let i = 0; i < data.nhits; i++) {
          this.listeCandidats[0].voix += data.records[i].fields.nb_voix_1;
          this.listeCandidats[1].voix += data.records[i].fields.nb_voix_2;
          this.listeCandidats[2].voix += data.records[i].fields.nb_voix_3;
          this.listeCandidats[3].voix += data.records[i].fields.nb_voix_4;
          this.listeCandidats[4].voix += data.records[i].fields.nb_voix_5;
          this.listeCandidats[5].voix += data.records[i].fields.nb_voix_6;
          this.listeCandidats[6].voix += data.records[i].fields.nb_voix_7;
          this.listeCandidats[7].voix += data.records[i].fields.nb_voix_8;
          this.listeCandidats[8].voix += data.records[i].fields.nb_voix_9;
          this.listeCandidats[9].voix += data.records[i].fields.nb_voix_10;
        }
      }
    }
    else {
      this.listeCandidats.push({name : data.records[0].fields.candidat_1,
        voix : 0});
      this.listeCandidats.push({name : data.records[0].fields.candidat_2,
        voix : 0});

      for (let i = 0; i < data.nhits; i++) {
        this.listeCandidats[0].voix += data.records[i].fields.nb_voix_1;
        this.listeCandidats[1].voix += data.records[i].fields.nb_voix_2;
      }
    }
  }


  refineParticipation (data: any) {
    this.participation = {
      pourcentage: 0,
      inscrits: 0,
      blancs: 0,
      exprimes: 0,
      nuls: 0,
      abstention: 0,
      abstentionPourcentage: 0
    };

    var nb_bulletins = 0;
    for (let i = 0; i < data.nhits; i++) {
      this.participation.inscrits += data.records[i].fields.nb_inscrits;
      this.participation.blancs += data.records[i].fields.nb_blanc;
      this.participation.nuls += data.records[i].fields.nb_nuls;
      this.participation.exprimes += data.records[i].fields.nb_exprimes;
      this.participation.abstention += data.records[i].fields.nb_inscrits - data.records[i].fields.nb_bulletins;
      nb_bulletins += data.records[i].fields.nb_bulletins;
    }
    this.participation.pourcentage = (nb_bulletins / this.participation.inscrits)*100;
    this.participation.abstentionPourcentage = (this.participation.abstention / this.participation.inscrits)*100;
  }

  calculPourcentageCandidats() {
    var sum = 0;
    for (let i = 0; i < this.listeCandidats.length; i++) {
      this.listeCandidats[i].pourcentage = (this.listeCandidats[i].voix / this.participation.exprimes)*100;
      sum += this.listeCandidats[i].pourcentage;
    }
  }


}
