import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataRefinerService } from '../services/dataRefiner.service';
import { Subscription } from 'rxjs';

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

  bureauxSelectedSubscription: Subscription;

  constructor(private dataRefinerService: DataRefinerService) { }

  ngOnInit(): void {
    this.bureauxSelectedSubscription = this.dataRefinerService.bureauSelectedSubject.subscribe(
      (bureau: any) => {
        this.bureau_value = bureau;
        this.newBureauEvent.emit(this.bureau_value);
      }
    );
  }

  //envoie un évènement au component parent
  onChange(){
    this.newBureauEvent.emit(this.bureau_value);
  }

}
