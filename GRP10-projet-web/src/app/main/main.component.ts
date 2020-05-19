import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataRefinerService } from '../services/dataRefiner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  candidats_zone = [
    {
      name: 'Phillipe POUTOU',
      voix: '900',
      pourcentage: '56'
    },
    {
      name: 'Albert DUPRES',
      voix: '325',
      pourcentage: '25'
    },
    {
      name: 'Jacques CHEMINADE',
      voix: '200',
      pourcentage: '29'
    },
    {
      name: 'Phillipe POUTOU',
      voix: '900',
      pourcentage: '56'
    },
    {
      name: 'Albert DUPRES',
      voix: '325',
      pourcentage: '25'
    },
    {
      name: 'Jacques CHEMINADE',
      voix: '200',
      pourcentage: '29'
    },
    {
      name: 'Phillipe POUTOU',
      voix: '900',
      pourcentage: '56'
    },
    {
      name: 'Albert DUPRES',
      voix: '325',
      pourcentage: '25'
    },
    {
      name: 'Jacques CHEMINADE',
      voix: '200',
      pourcentage: '29'
    }
  ];

  participation_zone = {
    pourcentage: 90,
    inscrits: 6000,
    blancs: 15,
    nuls: 60,
    exprimes: 5000
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
    },
    {
      name: 'Jacques CHEMINADE',
      voix: '200',
      pourcentage: '29'
    },
    {
      name: 'Phillipe POUTOU',
      voix: '900',
      pourcentage: '56'
    },
    {
      name: 'Albert DUPRES',
      voix: '325',
      pourcentage: '25'
    },
    {
      name: 'Jacques CHEMINADE',
      voix: '200',
      pourcentage: '29'
    },
    {
      name: 'Phillipe POUTOU',
      voix: '900',
      pourcentage: '56'
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

  //event changement de bureau dans select-bureau
  changeBureau(newBureau: string) {
    this.bureau_selected = newBureau;
  }

  annee_selected = 2017;
  tour_selected = 1;

  changeAnneeTour(newAnneeTour){
    this.annee_selected = newAnneeTour[0];
    this.tour_selected = newAnneeTour[1];

    console.log("nouvelle année / tour : " + this.annee_selected + " " + this.tour_selected);
  }

  dataSubscription: Subscription;

  data: any;

  constructor(private dataRefinerService: DataRefinerService) { }

  ngOnInit(): void {
    this.dataSubscription = this.dataRefinerService.fullDataSubject.subscribe(
      (serverdata: any) => {
        this.data = serverdata;
      }
    );
  }


  onFetch() {
    this.dataRefinerService.changeSpecificData("P17","2","vi",null,["MACRON+Emmanuel",null,null,null,null,null,null,null,null,null]);
    this.dataRefinerService.setNumeroTour("1");
    this.dataRefinerService.setCandidats(null);
    this.dataRefinerService.fetchSpecificData();
  }





}
