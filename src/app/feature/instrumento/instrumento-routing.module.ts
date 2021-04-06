import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioInstrumentoComponent } from './components/formulario-instrumento/formulario-instrumento.component';

import { InstrumentoComponent } from './components/instrumento/instrumento.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InstrumentoComponent
      },
      {
        path: 'create',
        component: FormularioInstrumentoComponent
      },
      {
        path: 'edit/:id',
        component: FormularioInstrumentoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentoRoutingModule { }
