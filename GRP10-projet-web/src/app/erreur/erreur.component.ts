import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.scss']
})
export class ErreurComponent implements OnInit {

  error_msg: string = "ceci est un message d'erreur";

  constructor() { }

  ngOnInit(): void {
  }


}
