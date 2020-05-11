import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.scss']
})
export class FootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToTop() {
    window.scrollTo(0,0);
  }

}
