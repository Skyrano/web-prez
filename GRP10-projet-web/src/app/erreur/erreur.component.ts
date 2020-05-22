import { Component } from '@angular/core';
import { ErrorManager } from '../services/error.service';

@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.scss']
})

//Affiche le bordereau d'erreur
export class ErreurComponent {

  //récupération du gestionnaire d'erreur à la construction
  constructor(public errorManager: ErrorManager) { }

}
