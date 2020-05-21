import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRefinerService } from '../services/dataRefiner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  candidats_bureau = [
  ];

  participation_bureau = {
    pourcentage: 0,
    inscrits: 0,
    blancs: 0,
    nuls: 0,
    exprimes: 0
  };

  bureaux = []; //input to select-bureau
  bureau_selected = ''; //output from select-bureau
  resetBureaux: any[] = [{}];

  //event changement de bureau dans select-bureau
  changeBureau(newBureau: string) {
    this.bureau_selected = newBureau;
    this.dataRefinerService.setBureauxSelected(this.bureau_selected);
    this.dataRefinerService.fetchSpecificData();
  }

  recreateBureaux() {
    this.resetBureaux[0] = {};
  }

  annee_selected = "P17";
  tour_selected = "1";
  resetAnneeTour: any[] = [{}];

  recreateSelectAnneeTour() {
    this.resetAnneeTour[0] = {};
  }


  changeAnneeTour(newAnneeTour){
    this.annee_selected = newAnneeTour[0];
    this.tour_selected = newAnneeTour[1];

    this.dataRefinerService.setCodeElection(this.annee_selected);
    this.dataRefinerService.setNumeroTour(this.tour_selected);
    this.dataRefinerService.fetchSpecificData();
  }

  dataSubscription: Subscription;
  data: any;

  candidatsSubscription: Subscription;
  candidats: any;

  participationSubscription: Subscription;
  participation: any;

  refeshSelectTourAnneeSubscription: Subscription;
  refreshBureauxSubscription: Subscription;


  bureauxSubscription: Subscription;

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


  onFetch() {
    this.dataRefinerService.changeSpecificData("P17","1","vi",null,null);
    this.dataRefinerService.fetchSpecificData();
  }





}
