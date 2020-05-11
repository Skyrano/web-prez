import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../services/httpclient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  candidats = [
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

  participation = {
    pourcentage: 90,
    inscrits: 6000,
    blancs: 15,
    nuls: 60,
    exprimes: 5000
  };

  dataSubscription: Subscription;

  data: any;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.dataSubscription = this.httpClientService.dataSubject.subscribe(
      (serverdata: any) => {
        this.data = serverdata;
        console.log(this.data);
      }
    );
    this.httpClientService.loadDataFromServer();
  }

  fetchData() {
    this.httpClientService.loadDataFromServer();
  }


}
