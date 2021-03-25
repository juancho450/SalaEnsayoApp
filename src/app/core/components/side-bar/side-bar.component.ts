import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() items: MenuItem[];

  constructor() { }

  ngOnInit(): void { }

  desplegarMenu() {
    const sideMenu = document.querySelector('#wrapper');
    sideMenu.classList.toggle('toggled');
  }
}
