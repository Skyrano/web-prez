/* Projet Web
Kiéran GOYAT
Alistair RAMEAU
Cybersécurité du logiciel
1re année
*/

import { Component, OnInit } from '@angular/core';
import { ErrorManager } from './services/error.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GRP10-projet-web';

  constructor(private errorManager: ErrorManager) {}

   ngOnInit() {}
}

