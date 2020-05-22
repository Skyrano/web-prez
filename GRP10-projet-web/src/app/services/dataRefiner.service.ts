import { Subscription, Subject } from 'rxjs';
import { HttpClientService } from './httpclient.service';
import { Injectable } from '@angular/core';
import { ErrorManager } from './error.service';

@Injectable() //ce service sera utilisé ailleurs et doit donc être injectable dans un autre component

//Ce service gére les données récupérées avec le client HTTP. Il distribue et rafraichit ensuite les données et dirige les actions des components en fonction des données recues
export class DataRefinerService {

  rawDataSubscription: Subscription;  //pour récpéré les données brutes auprès du client http
  mapInitialized : boolean = false;


  bureaux: Array<any>;  //contient les informations sur les bureaux de la ville (coordonnées, nom, est ce que ce bureau est sélectionné)
  bureauxSubject = new Subject<Array<any>>(); //permet d'émettre la liste des bureaux

  bureauSelectedSubject = new Subject<String>(); //émet en cas de changement de bureau avec le nom du nouveau bureau

  bureauxNameList: Array<any>;  //contient uniquement la liste des noms des bureaux
  bureauxNameListSubject = new Subject<Array<any>>();

  listeCandidats: Array<any>;  //contient les informations des candidats (nom, nombre de voix, pourcentage des voix)
  listeCandidatsSubject = new Subject<Array<any>>();

  participation: any;  //contient les informations de participation
  participationSubject = new Subject<any>();

  refeshSelectTourAnneeSubject = new Subject<any>(); //émet pour rafraichir les menus déroulants de sélection
  refeshBureauxSubject = new Subject<any>(); //émet pour rafraichir le menu de sélection des bureaux

  //informations voulues par l'utilisateurs, utilisées pour crééer la requête à envoyer au serveur
  codeElection: string;
  numeroTour: string;
  niveauDetail: string;
  nomLieu: string;
  candidats: Array<string>;




  constructor(private httpClientService: HttpClientService, private errorService: ErrorManager) {
    this.rawDataSubscription = this.httpClientService.rawDataSubject.subscribe(
      (serverdata: any) => {
        if (this.getMapInitialized()) { //si la carte est déja initialisée (mode de fonctionnement nominal)
          this.refineParticipation(serverdata);  //on raffine les informations sur les candidats et la participation
          this.refineCandidats(serverdata);
          this.calculPourcentageCandidats(); //et on calcule le pourcentage des candidats
          this.emitSpecificData(); //puis ont émet ces informations
        }
        else { //si la carte n'est pas encore initialisée (première ouverture ou réinitialisation de la carte après appui sur accueil par exemple)
          this.refineMap(serverdata); //on rafine les informations à propos de la carte
          this.reinitMap(); //et on les envoie
        }
      }
    );
    this.fetchAllData(); //point d'entrée de l'application (hors composant principaux comme index.html et app.component) : on va chercher une première fois toutes les données
                          //de l'API des élections pour raffiner les infos de la carte lors du lancement de ce service
  }

  //Cette fonction réinitialise la carte après le retour vers l'accueil de l'application
  reinitMap() {
    this.changeSpecificData(null,null,null,null,null);
    this.mapInitialized = false;
    this.setBureauxSelected("Tous les centres")  //on remet le menu déroulant des bureaux à sa position par défaut
    this.bureauxSubject.next(this.bureaux);  //on envoie toutes les données requises pour réinitialiser les données dans les components
    this.bureauxNameListSubject.next(this.bureauxNameList);
    this.refeshSelectTourAnneeSubject.next();
    this.refeshBureauxSubject.next();
  }

  //Renvoie l'état actuel de la carte
  getMapInitialized() {
    return this.mapInitialized;
  }

  //Indique que la carte a été initialisée
  setMapInitialized() {
    this.mapInitialized = true;
  }

  //Émet les informations partielles permettant de rafraichir les informations des candidats
  emitSpecificData() {
    this.listeCandidatsSubject.next(this.listeCandidats);
    this.participationSubject.next(this.participation);
  }

  //Envoie une requête au client HTTP demandant d'aller chercher toutes les données de l'API
  fetchAllData() {
    this.httpClientService.createLink(null, null, null,  null, null);
    this.httpClientService.loadDataFromServer();
  }

  //Envoie une requête au client HTTP demandant d'aller chercher les données voulues par l'utilisateur
  fetchSpecificData() {
    this.httpClientService.createLink(this.codeElection, this.numeroTour, this.niveauDetail,  this.nomLieu, this.candidats);
    this.httpClientService.loadDataFromServer();
  }

  //Change une partie des informations vouleus par l'utilisateur
  changeSpecificData(codeElection: string, numeroTour: string, niveauDetail: string,  nomLieu: string, candidats: Array<string>) {
    this.codeElection = codeElection;
    this.numeroTour = numeroTour;
    this.niveauDetail = niveauDetail;
    this.nomLieu = nomLieu;
    this.candidats = candidats;
  }

  //Change l'élection à afficher
  setCodeElection(codeElection: string) {
    this.codeElection = codeElection;
  }

  //Change le tour à afficher
  setNumeroTour(numeroTour: string) {
    this.numeroTour = numeroTour;
  }

  //Change le bureau sélectionné
  setBureauxSelected(bureau: string) {
    if (bureau == "Tous les centres") { //si aucun bureau sélectionné en particulier
      this.nomLieu = null;
      this.niveauDetail = "vi"; //on veut les détails de la ville entière
      for (let i = 0; i < this.bureaux.length; i++) {
        this.bureaux[i].selected = false; //on désélectionne tous les bureaux
      }
    }
    else {
      this.nomLieu = bureau; //si bureau particulier on le définit en tant que bureau sélectionné
      this.niveauDetail = "bu"; //on va chercher les informations d'un seul bureau
      for (let i = 0; i < this.bureaux.length; i++) {
        if(this.bureaux[i].nom == bureau) { //on met tous les bureaux en non-sélectionné sauf le bureau voulu
          this.bureaux[i].selected = true;
        }
        else {
          this.bureaux[i].selected = false;
        }
      }
    }
    this.bureauxSubject.next(this.bureaux);
  }

//Rafraichit le bureau sélectionné pour le menu déroulant des bureaux
  changeBureauxSelected(bureau: string) {
    this.bureauSelectedSubject.next(bureau);
  }

//Raffine les informations brutes utilisées pour afficher les informations sur la carte
  refineMap(rawdata: any) {
    this.bureaux = new Array();
    this.bureauxNameList = new Array();

    for (let i = 0; i < rawdata.nhits ; i++) { //pour tous les records de l'API
      if (rawdata.records[i].fields.hasOwnProperty('nom_lieu') && rawdata.records[i].fields.hasOwnProperty('geo_point')) { //si on a bien affaire à un bureau
        let index = this.bureauxNameList.indexOf(rawdata.records[i].fields.nom_lieu); //on vérifie que ce bureau n'est pas déja rentré
        if (index == -1) {
          this.bureaux.push({nom: rawdata.records[i].fields.nom_lieu,  //si non on ajout les données de ce bureau dans la liste des bureaux
                            point: rawdata.records[i].fields.geo_point,
                            selected: false});
          this.bureauxNameList.push(rawdata.records[i].fields.nom_lieu); //et on ajoute son nom à la liste des noms
        }
      }
    }

    this.bureauxNameList.splice(0,0,"Tous les centres") //on insère l'option Tous les bureaux au début de la liste des bureaux
  }

//Raffine les informations concernant les candidats
  refineCandidats (data: any) {
    this.listeCandidats = new Array<any>();

    if (data.nhits > 0) { //on vérifie que l'on a bien une réponse avec des candidats
      if (data.records[0].fields.hasOwnProperty('candidat_3')) { //si on est pas au deuxième tour alors il y au moins 10 candidats
        this.listeCandidats.push({name : data.records[0].fields.candidat_1, //on ajoute les informations de chaque candidat
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

        if (data.records[0].fields.hasOwnProperty('candidat_11')) { //si il y a un 11eme candidat on l'ajoute aussi
          this.listeCandidats.push({name : data.records[0].fields.candidat_11,
            voix : 0});
            for (let i = 0; i < data.nhits; i++) {  //on ajoute les voix dex 11 candidats (on sépare en 2 pour éviter un if à chaque itération du for)
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
          for (let i = 0; i < data.nhits; i++) {  //on ajoute les voix des 10 candidats
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
      else {    //si on est au dexuième tour on ajoute les 2 candidats
        this.listeCandidats.push({name : data.records[0].fields.candidat_1,
          voix : 0});
        this.listeCandidats.push({name : data.records[0].fields.candidat_2,
          voix : 0});

        for (let i = 0; i < data.nhits; i++) { //on ajoute les voix aux 2 candidats
          this.listeCandidats[0].voix += data.records[i].fields.nb_voix_1;
          this.listeCandidats[1].voix += data.records[i].fields.nb_voix_2;
        }
      }
      this.errorService.close_error(); //si il y avait une erreur (pas de candidats par exemple) on retire l'erreur
    }
    else { //si la réponse n'a pas de candidat alors le bureau sélectionné n'a pas été utilisé durant ces élections
      this.errorService.print_error("Le bureau sélectionné n'a pas été utilisé pendant ces élections");
    }
  }

//Raffine les informations concernant la participation des électeurs
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
    if (data.nhits > 0) { //si on a des réponses
      var nb_bulletins = 0;
      for (let i = 0; i < data.nhits; i++) { //on itère dans les réponse de l'API et on ajoute toutes les informations
        this.participation.inscrits += data.records[i].fields.nb_inscrits;
        this.participation.blancs += data.records[i].fields.nb_blanc;
        this.participation.nuls += data.records[i].fields.nb_nuls;
        this.participation.exprimes += data.records[i].fields.nb_exprimes;
        this.participation.abstention += data.records[i].fields.nb_inscrits - data.records[i].fields.nb_bulletins;
        nb_bulletins += data.records[i].fields.nb_bulletins;
      }
      this.participation.pourcentage = (nb_bulletins / this.participation.inscrits)*100;  //on calcule le pourcentage de vote et d'abstention
      this.participation.abstentionPourcentage = (this.participation.abstention / this.participation.inscrits)*100;
    }
  }

//Raffine les informations à propos des pourcentages des différents candidats
  calculPourcentageCandidats() {
    var sum = 0;
    for (let i = 0; i < this.listeCandidats.length; i++) { //on calcule le pourcentage pour chaque candidat
      this.listeCandidats[i].pourcentage = (this.listeCandidats[i].voix / this.participation.exprimes)*100;
      sum += this.listeCandidats[i].pourcentage;
    }
  }


}
