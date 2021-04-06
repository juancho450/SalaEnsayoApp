import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DatePipe } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { FormularioReservaComponent } from './components/formulario-reserva/formulario-reserva.component';
import { ReservaService } from './shared/service/reserva.service';

@NgModule({
  declarations: [ReservaComponent, FormularioReservaComponent],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [ReservaService, DatePipe]
})
export class ReservaModule { }
