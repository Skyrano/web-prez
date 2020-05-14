import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-annee-tour',
  templateUrl: './select-annee-tour.component.html',
  styleUrls: ['./select-annee-tour.component.scss']
})
export class SelectAnneeTourComponent implements OnInit {

  annee_value = 2017;
  tour_value = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    console.log(this.annee_value + " " + this.tour_value);
  }

}
