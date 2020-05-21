import { Component, Input,  OnInit } from '@angular/core';
import { ErrorManager } from '../services/error.service';

@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.scss']
})
export class ErreurComponent implements OnInit {

  //récupération du gestionnaire d'erreur à la construction
  constructor(public errorManager: ErrorManager) { }

  ngOnInit(): void { }

}
