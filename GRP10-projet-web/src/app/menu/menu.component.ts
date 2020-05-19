import { Component, OnInit } from '@angular/core';
import { DataRefinerService } from '../services/dataRefiner.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private dataRefinerService: DataRefinerService) { }

  ngOnInit(): void {
  }

  onRefresh() {
    this.dataRefinerService.reinitMap();
  }

}
