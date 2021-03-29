import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '@shared/shared.module';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { FormularioReservaComponent } from './components/formulario-reserva/formulario-reserva.component';
import { ReservaService } from './shared/service/reserva.service';





@NgModule({
  declarations: [ReservaComponent, ListarReservaComponent, FormularioReservaComponent],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    NgbModule,
    NgSelectModule,
    SharedModule
  ],
  providers: [ReservaService]
})
export class ReservaModule { }
