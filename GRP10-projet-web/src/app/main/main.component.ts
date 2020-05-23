import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRefinerService } from '../services/dataRefiner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

//Récupère les données pour les transmettre vers les composants inférieurs
export class MainComponent implements OnInit {

  candidats_bureau = []; //la liste des candidats, vide par défaut
  candidatsSubscription: Subscription; //Pour aller chercher la liste des candidats

  participation_bureau = { //la participation
    pourcentage: 0,
    inscrits: 0,
    blancs: 0,
    nuls: 0,
    exprimes: 0
  };
  participationSubscription: Subscription; //Pour aller chercher la participation

  bureaux = []; //input to select-bureau
  bureauxSubscription: Subscription; //Pour aller chercher la liste des bureaux


  bureau_selected = ''; //output from select-bureau
  resetBureaux: any[] = [{}]; //permet de reset la liste des bureaux à l'aide de *ngFor


  annee_selected = "P17"; //année sélectionné
  tour_selected = "1"; //tour sélectionné
  resetAnneeTour: any[] = [{}]; //permet de reset la liste des années et tours


  refeshSelectTourAnneeSubscription: Subscription; //vérifier si la liste des tours et années a changé
  refreshBureauxSubscription: Subscription; //vérifier si la liste des bureaux a changé


  constructor(private dataRefinerService: DataRefinerService) { }

  ngOnInit(): void {
    this.bureauxSubscription = this.dataRefinerService.bureauxNameListSubject.subscribe(
      (data: any) => {
        this.bureaux = data;
      }
    );

    this.candidatsSubscription = this.dataRefinerService.listeCandidatsSubject.subscribe(
      (data: any) => {
        this.candidats_bureau = data;
      }
    );

    this.participationSubscription = this.dataRefinerService.participationSubject.subscribe(
      (data: any) => {
        this.participation_bureau = data;
      }
    );

    this.refeshSelectTourAnneeSubscription = this.dataRefinerService.refeshSelectTourAnneeSubject.subscribe(
      () => {
        this.recreateSelectAnneeTour();
      }
    );

    this.refreshBureauxSubscription = this.dataRefinerService.refeshBureauxSubject.subscribe(
      () => {
        this.recreateBureaux();
      }
    );
  }

  //event changement de bureau dans select-bureau
  changeBureau(newBureau: string) {
    this.bureau_selected = newBureau;
    this.dataRefinerService.setBureauxSelected(this.bureau_selected); //si le bureau a changé on informe le service de refining du changement et on rafraichit les données
    this.dataRefinerService.fetchSpecificData();
  }

//Reset la liste des bureaux
  recreateBureaux() {
    this.resetBureaux[0] = {}; //le changement artificiel de cete liste va faire recharger la structure *ngFor
  }

  //Reset la liste des années et tours
  recreateSelectAnneeTour() {
    this.resetAnneeTour[0] = {}; //comme pour les bureaux, on fait un changement artificiel de la liste pour recharger le *ngFor
  }

//Event de changement de l'année ou tour sélectionné
  changeAnneeTour(newAnneeTour){
    this.annee_selected = newAnneeTour[0];
    this.tour_selected = newAnneeTour[1];

    this.dataRefinerService.setCodeElection(this.annee_selected); //on informe le service de refining du changement et on rafraichit les données des candidats
    this.dataRefinerService.setNumeroTour(this.tour_selected);
    this.dataRefinerService.fetchSpecificData();
  }

}
