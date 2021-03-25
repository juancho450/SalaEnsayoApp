import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { FormularioReservaComponent } from './components/formulario-reserva/formulario-reserva.component';


@NgModule({
  declarations: [ReservaComponent, ListarReservaComponent, FormularioReservaComponent],
  imports: [
    CommonModule,
    ReservaRoutingModule
  ]
})
export class ReservaModule { }
