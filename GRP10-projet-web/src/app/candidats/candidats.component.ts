import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})
export class CandidatsComponent implements OnInit {

  @Input() candidats;

  constructor() { }

  ngOnInit(): void {
    console.log(this.candidats);
  }

}
