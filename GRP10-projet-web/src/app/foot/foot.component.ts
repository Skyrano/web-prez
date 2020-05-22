import { Component } from '@angular/core';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.scss']
})
export class FootComponent {

  constructor() { }

  //retourne en haut de la page
  goToTop() {
    window.scrollTo(0,0);
  }

}
