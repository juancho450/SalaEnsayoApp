import { NgModule } from '@angular/core';
import { InstrumentoRoutingModule } from './instrumento-routing.module';
import { InstrumentoComponent } from './components/instrumento/instrumento.component';
import { SharedModule } from '@shared/shared.module';
import { InstrumentoService } from './shared/service/instrumento.service';
import { DatePipe } from '@angular/common';
import { FormularioInstrumentoComponent } from './components/formulario-instrumento/formulario-instrumento.component';


@NgModule({
  declarations: [InstrumentoComponent, FormularioInstrumentoComponent],
  imports: [
    InstrumentoRoutingModule,
    SharedModule
  ],
  providers: [InstrumentoService, DatePipe]
})
export class InstrumentoModule { }
