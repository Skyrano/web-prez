import { Component, OnInit } from '@angular/core';
import { ErrorManager } from '../services/error.service';

@Component({
  selector: 'app-four-ofour',
  templateUrl: './four-ofour.component.html',
  styleUrls: ['./four-ofour.component.scss']
})
export class FourOfourComponent implements OnInit {

  constructor(private errorManager: ErrorManager) { }

  ngOnInit() {
      this.errorManager.print_error("Erreur 404 : Page introuvable");
   }

}
