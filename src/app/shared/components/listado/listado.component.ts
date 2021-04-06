import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Columna } from '@shared/model/columna';
import { Items } from '@shared/model/items';
import { ListadoService } from '@shared/service/listado/listado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  providers: [ListadoService]
})
export class ListadoComponent implements OnInit {
  @Input() columnas: Columna[];
  @Input() urlEditar: string;
  @Input() componente: string;
  items: Items[];

  constructor(public listadoServicio: ListadoService, private router: Router) {
  }

  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
     this.listadoServicio.consultar(this.componente).subscribe(res => {
       this.items = res;
     });
  }

  eliminar(id: number) {
    this.listadoServicio.eliminar(id, this.componente).subscribe(res => {
      if (res) {
        swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Dato eliminado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtener();
      }
    });
  }

  editar(id: number) {
    this.router.navigate([this.urlEditar , id]);
  }
}
