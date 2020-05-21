import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-bureau',
  templateUrl: './select-bureau.component.html',
  styleUrls: ['./select-bureau.component.scss']
})
export class SelectBureauComponent implements OnInit {

  @Input() bureaux;
  bureau_value = "Tous les bureaux";

  @Output() newBureauEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    this.newBureauEvent.emit(this.bureau_value);
  }

}
