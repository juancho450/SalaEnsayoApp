import { Component, OnInit } from '@angular/core';
import { Columna } from '@shared/model/columna';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  columnasReservas: Columna[];
  urlEditar: string;
  componente: string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.urlEditar = '/reserva/edit/';
    this.componente = 'reservas';
    this.columnasReservas = [
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
        header: 'Sala',
        headerClass: 'text-left',
        data: 'sala',
        dataClass: 'text-left'
      },
      {
        header: 'Hora inicial',
        headerClass: 'text-left',
        data: 'horaInicial',
        dataClass: 'text-left'
      },
      {
        header: 'Hora Final',
        headerClass: 'text-left',
        data: 'horaFinal',
        dataClass: 'text-left'
      },
      {
        header: 'Alquila',
        data: 'alquilaInstrumentos',
        headerClass: 'text-left',
        dataClass: 'text-left',
        render: (alquila: boolean) => {
          const alquilaInstrumentos = alquila ? 'Si' : 'No';
          return alquilaInstrumentos;
        }
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
