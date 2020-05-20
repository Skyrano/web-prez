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

  zones: Array<any>;
  zonesSubject = new Subject<Array<any>>();

  listeCandidats: Array<any>;
  listeCandidatsSubject = new Subject<Array<any>>();

  participation: any;
  participationSubject = new Subject<any>();

  codeElection: string;
  numeroTour: string;
  niveauDetail: string;
  nomLieu: string;
  candidats: Array<string>;




  constructor(private httpClientService: HttpClientService) {
    this.rawDataSubscription = this.httpClientService.rawDataSubject.subscribe(
      (serverdata: any) => {
        this.fullData = serverdata;
        if (this.getMapInitialized()) {
          this.refineParticipation(serverdata);
          this.refineCandidats(serverdata);
          this.calculPourcentageCandidats();
          this.emitSpecificData();
        }
        else {
          this.refineMap(serverdata);
          this.emitAllData();
        }
      }
    );
    this.fetchAllData();
  }

  reinitMap() {
    this.changeSpecificData(null,null,null,null,null);
    this.mapInitialized = false;
    this.zonesSubject.next(this.zones);
  }

  getMapInitialized() {
    return this.mapInitialized;
  }

  setMapInitialized() {
    this.mapInitialized = true;
  }

  emitAllData() {
    this.fullDataSubject.next(this.fullData);
    this.bureauxSubject.next(this.bureaux);
    this.zonesSubject.next(this.zones);
  }

  emitSpecificData() {
    this.fullDataSubject.next(this.fullData);
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


  refineMap(rawdata: any) {
    this.bureaux = new Array();
    var xpos = new Array();
    for (let i = 0; i < rawdata.nhits ; i++) {
      if (rawdata.records[i].fields.hasOwnProperty('geo_point') && xpos.indexOf(rawdata.records[i].fields.geo_point[0]) == -1) {
        this.bureaux.push(rawdata.records[i].fields.geo_point);
        xpos.push(rawdata.records[i].fields.geo_point[0]);
      }
    }

    this.zones = new Array();
    xpos = new Array();

    for (let i = 0; i < rawdata.nhits ; i++) {
      if (rawdata.records[i].fields.hasOwnProperty('geo_shape') && xpos.indexOf(rawdata.records[i].fields.geo_shape.coordinates[0][0][1]) == -1) {
        var coordinates = new Array();
        for (let j = 0; j < rawdata.records[i].fields.geo_shape.coordinates[0].length; j++) {
          coordinates.push(rawdata.records[i].fields.geo_shape.coordinates[0][j].reverse());
        }
        this.zones.push(coordinates);
        xpos.push(this.zones[this.zones.length-1][0][0])
      }
    }
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
