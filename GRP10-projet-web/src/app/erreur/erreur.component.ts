import { Component, Input,  OnInit } from '@angular/core';
import { ErrorManager } from '../services/error.service';

@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.scss']
})
export class ErreurComponent implements OnInit {

  manager:ErrorManager;

  constructor(private errorManager: ErrorManager) { }

  ngOnInit(): void {
    this.manager = this.errorManager;
  }

}
