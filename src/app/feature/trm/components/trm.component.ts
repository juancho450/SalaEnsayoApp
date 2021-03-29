import { Component, OnInit } from '@angular/core';
import TrmApi from 'trm-api';
import { TRM } from '../shared/model/trm';

const TOKEN_TRM = 'dDOobEkmzd0m5YRI9Ed9ruZPB';

@Component({
  selector: 'app-trm',
  templateUrl: './trm.component.html',
  styleUrls: ['./trm.component.scss']
})
export class TrmComponent implements OnInit {
  public tasaRepresentativaMercado: TRM;
  constructor() { }

  ngOnInit(): void {
   this.obtenerTRM();
  }

  public obtenerTRM() {
    const trmapi = new TrmApi(TOKEN_TRM);
    trmapi
    .latest()
    .then((data) => this.tasaRepresentativaMercado = data )
    .catch((error) => console.log(error));
   }
}
