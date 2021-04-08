import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sala de Ensayo CEIBA';
  public navLinks: MenuItem[] = [
    { url: '/', nombre: 'Home' },
    { url: '/reserva', nombre: 'Reservas' },
    { url: '/instrumento', nombre: 'Instrumentos' },
  ];
}
