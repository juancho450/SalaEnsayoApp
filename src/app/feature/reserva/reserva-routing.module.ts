import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioReservaComponent } from './components/formulario-reserva/formulario-reserva.component';
import { ReservaComponent } from './components/reserva/reserva.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ReservaComponent
      },
      {
        path: 'create',
        component: FormularioReservaComponent
      },
      {
        path: 'edit/:id',
        component: FormularioReservaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
