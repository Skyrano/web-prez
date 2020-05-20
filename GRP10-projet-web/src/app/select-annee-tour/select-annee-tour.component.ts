import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-annee-tour',
  templateUrl: './select-annee-tour.component.html',
  styleUrls: ['./select-annee-tour.component.scss']
})
export class SelectAnneeTourComponent implements OnInit {

  annee_value: String = "P17";
  tour_value: String = "1";

  @Output() newAnneeTourEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    this.newAnneeTourEvent.emit([this.annee_value, this.tour_value]);
  }
}
