import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-bureau',
  templateUrl: './select-bureau.component.html',
  styleUrls: ['./select-bureau.component.scss']
})
export class SelectBureauComponent implements OnInit {

  //liste des bureaux (centres de vote) à sélectionner
  @Input() bureaux;
  bureau_value = "Tous les centres";

  //évènement output
  @Output() newBureauEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  //envoie un évènement au component parent
  onChange(){
    this.newBureauEvent.emit(this.bureau_value);
  }

}
