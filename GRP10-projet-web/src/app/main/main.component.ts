import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRefinerService } from '../services/dataRefiner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  candidats_zone = [];

  participation_zone = {
    pourcentage: 0,
    inscrits: 0,
    blancs: 0,
    nuls: 0,
    exprimes: 0
  };

  candidats_bureau = [
    {
      name: 'Phillipe POUTOU',
      voix: '900',
      pourcentage: '56'
    },
    {
      name: 'Albert DUPRES',
      voix: '325',
      pourcentage: '25'
    }
  ];

  participation_bureau = {
    pourcentage: 90,
    inscrits: 6000,
    blancs: 15,
    nuls: 60,
    exprimes: 5000
  };

  bureaux = ["bureau 500", "bureau 501", "bureau 502"]; //input to select-bureau
  bureau_selected = ''; //output from select-bureau
  resetBureaux: any[] = [{}];

  //event changement de bureau dans select-bureau
  changeBureau(newBureau: string) {
    this.bureau_selected = newBureau;
    this.dataRefinerService.setBureauxSelected(this.bureau_selected);
    this.dataRefinerService.fetchSpecificData();
  }

  recreateBureaux() {
    console.log("recreating");

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
        this.candidats_zone = data;
      }
    );

    this.participationSubscription = this.dataRefinerService.participationSubject.subscribe(
      (data: any) => {
        this.participation_zone = data;
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
