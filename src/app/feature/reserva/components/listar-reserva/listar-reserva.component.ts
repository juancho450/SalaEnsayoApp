import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.scss']
})
export class ListarReservaComponent implements OnInit {
  reservas: Reserva[];

  constructor(public reservaService: ReservaService , private router: Router) { }

  ngOnInit(): void {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.reservaService.consultarReservas().subscribe(reservas => {
      this.reservas = reservas;
    });
  }

  eliminarReserva(reserva: Reserva) {
    this.reservaService.eliminar(reserva).subscribe(res => {
      if (res) {
        swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Reserva eliminada con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerReservas();
      }
    });
  }

  editarReserva(reserva: Reserva) {
    this.router.navigate([`/reserva/edit/${reserva.id}`]);
  }

}
