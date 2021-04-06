import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Columna } from '@shared/model/columna';

@Component({
  selector: 'app-instrumento',
  templateUrl: './instrumento.component.html',
  styleUrls: ['./instrumento.component.scss']
})
export class InstrumentoComponent implements OnInit {
  columnasInstrumentos: Columna[];
  urlEditar: string;
  componente: string;


  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.urlEditar = '/instrumento/edit/';
    this.componente = 'instrumento';
    this.columnasInstrumentos = [
      {
        header: 'Nombre',
        headerClass: 'text-left',
        data: 'nombre',
        dataClass: 'text-left'
      },
      {
        header: 'Fecha',
        headerClass: 'text-left',
        data: 'fecha',
        dataClass: 'text-left',
        render: (fecha: string) => {
          const fechaReserva = this.datePipe.transform(fecha, 'dd/MM/yyyy');
          return fechaReserva;
        }
      },
      {
        header: 'Cantidad',
        headerClass: 'text-left',
        data: 'cantidad',
        dataClass: 'text-left'
      },
      {
        header: 'Total',
        data: 'total',
        headerClass: 'text-left',
        dataClass: 'text-left'
      },
    ];
  }

}
