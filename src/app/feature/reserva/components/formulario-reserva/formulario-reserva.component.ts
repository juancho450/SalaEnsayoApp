import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Cantidad } from '@shared/model/cantidad';
import { Hora } from '@shared/model/hora';
import { Instrumento } from '@shared/model/instrumentos';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';
import swal from 'sweetalert2';
import { Sala } from '../../shared/model/sala';

const TARIFA = 15000;
const TARIFA_DESCUENTO = 12500;
const TARFIFA_EXTRA_INSTRUMENTO = 5000;
const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 50;
const LIMITE_MES = 3;

@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html'
})
export class FormularioReservaComponent implements OnInit {
  formularioReserva: FormGroup;
  private fecha = new Date();
  public fechaMinima = { year: this.fecha.getFullYear(), month: this.fecha.getMonth() + 1, day: this.fecha.getDate() + 1};
  public fechaMaxima = { year: this.fecha.getFullYear(), month: this.fecha.getMonth() + LIMITE_MES, day: this.fecha.getDate() };
  public mostrarInstrumentos: boolean;
  public horaInicial: Hora[];
  public horaFinal: Hora[];
  public cantidades: Cantidad[];
  public instrumentos: Instrumento[];
  public salas: Sala[];
  public totalTarifa: number;
  public totalTarifaExtra: number;
  public id: string;


  constructor(public reservaService: ReservaService, private router: Router,  public activatedRoute: ActivatedRoute) {
    this.totalTarifa = 0;
    this.totalTarifaExtra = 0;
    this.mostrarInstrumentos = false;
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
   }

  ngOnInit(): void {
    this.construirFormulario();
    this.obtenerHoras();
    this.obtenerCantidades();
    this.obtenerInstrumentos();
    this.obtenerSalas();

    if (this.id) {
      this.cargarDatos();
    }
  }

  private construirFormulario() {
    this.formularioReserva = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                          Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      fecha: new FormControl(null, [Validators.required]),
      hora_inicial: new FormControl(null, [Validators.required]),
      hora_final: new FormControl(null, [Validators.required]),
      tarifa:  new FormControl(0),
      cantidad: new FormControl(null),
      instrumento: new FormControl(null),
      alquila_instrumento: new FormControl(false),
      sala: new FormControl(null, Validators.required),
    });
  }

  public cargarDatos() {
    this.reservaService.consultarReserva(this.id).subscribe(res => {

      const fecha = {
        year: new Date(res.fecha).getFullYear(),
        month: new Date(res.fecha).getMonth() + 1,
        day: new Date(res.fecha).getDate(),
      };

      this.formularioReserva.controls.nombre.setValue(res.nombre);
      this.formularioReserva.controls.sala.setValue(res.sala);
      this.formularioReserva.controls.fecha.setValue(fecha);
      this.formularioReserva.controls.hora_inicial.setValue(res.horaInicial);
      this.formularioReserva.controls.cantidad.setValue(res.cantidad);
      this.formularioReserva.controls.alquila_instrumento.setValue(res.alquilaInstrumentos);
      this.mostrarInstrumentos = res.alquilaInstrumentos;
      this.totalTarifa = res.totalTarifa;
      this.totalTarifaExtra = res.totalTarifaExtra;
      this.cambiarHoraFinal(res.horaInicial);
      this.formularioReserva.controls.hora_final.setValue(res.horaFinal);
      this.establecerValidacionesInstrumentos();
      this.calcularTarifa(res.horaInicial , res.horaFinal);
      this.calcularTarifaExtra(res.cantidad);
      this.formularioReserva.controls.instrumento.setValue(res.instrumentos);
    });
  }

  public obtenerHoras() {
    this.reservaService.consultarHoras().subscribe(res => {
      this.horaInicial = res;
    });
  }

  public obtenerCantidades() {
    this.reservaService.consultarCantidades().subscribe(res => {
      this.cantidades = res;
    });
  }

  public obtenerInstrumentos() {
    this.reservaService.consultarInstrumentos().subscribe(res => {
      this.instrumentos = res;
    });
  }

  public obtenerSalas() {
    this.reservaService.consultarSalas().subscribe(res => {
      this.salas = res;
    });
  }

  abrirDatePicker(id: NgbInputDatepicker) {
    id.toggle();
  }

  cambiarCheckbox(checked: boolean) {
    this.mostrarInstrumentos = checked;
    this.establecerValidacionesInstrumentos();
  }

  establecerValidacionesInstrumentos() {
    if (this.mostrarInstrumentos) {
      this.formularioReserva.controls.cantidad.setValidators(Validators.required);
      this.formularioReserva.controls.instrumento.setValidators(Validators.required);
      this.formularioReserva.controls.cantidad.updateValueAndValidity();
      this.formularioReserva.controls.instrumento.updateValueAndValidity();
    } else {
      this.formularioReserva.controls.cantidad.setValidators([]);
      this.formularioReserva.controls.instrumento.setValidators([]);
      this.formularioReserva.controls.cantidad.updateValueAndValidity();
      this.formularioReserva.controls.instrumento.updateValueAndValidity();
      this.formularioReserva.controls.cantidad.setValue(null);
      this.formularioReserva.controls.instrumento.setValue(null);
      this.totalTarifaExtra = 0;
      this.calcularTarifaExtra(0);
    }
  }

  cambiarHoraFinal(horaInicial: number) {
    this.formularioReserva.controls.hora_final.reset();
    if (typeof horaInicial !== 'undefined') {
      const filtrarHorasFinales = this.horaInicial.filter(element => element.hora !== horaInicial &&  element.hora > horaInicial);
      this.horaFinal = filtrarHorasFinales;
    }
  }

  calcularTarifa(horaInicial: number , horaFinal: number) {
    if (horaInicial !== null && horaFinal !== null) {
      const totalHoras = horaFinal - horaInicial;
      const maximoTarifaNormal = 2;
      if (totalHoras > maximoTarifaNormal) {
        this.totalTarifa = (horaFinal - horaInicial) * TARIFA_DESCUENTO;
      } else {
        this.totalTarifa = (horaFinal - horaInicial) * TARIFA;
      }
      this.establecerTotalTarifa();
    } else {
      this.totalTarifa = 0;
      if (this.totalTarifaExtra !== 0) {
        this.formularioReserva.controls.tarifa.setValue(this.totalTarifaExtra);
      } else {
        this.formularioReserva.controls.tarifa.setValue(this.totalTarifa);
      }
    }
  }

  establecerTotalTarifa() {
    if (this.totalTarifaExtra !== 0) {
      this.formularioReserva.controls.tarifa.setValue(this.totalTarifa + this.totalTarifaExtra);
    } else {
      this.formularioReserva.controls.tarifa.setValue(this.totalTarifa);
    }
  }

  calcularTarifaExtra(cantidad: number) {
    this.formularioReserva.controls.instrumento.reset();
    this.totalTarifaExtra = (cantidad * TARFIFA_EXTRA_INSTRUMENTO);
    if (this.totalTarifa !== 0) {
      this.formularioReserva.controls.tarifa.setValue(this.totalTarifaExtra + this.totalTarifa);
    } else {
      this.formularioReserva.controls.tarifa.setValue(this.totalTarifaExtra);
    }
  }

  guardar() {
    const {year , month , day} = this.formularioReserva.controls.fecha.value;
    const reserva: Reserva = {
        id: typeof this.id !== 'undefined' ? Number(this.id) : null,
        nombre: this.formularioReserva.controls.nombre.value,
        fecha: new Date(year , month - 1 , day).toISOString(),
        horaInicial: this.formularioReserva.controls.hora_inicial.value,
        horaFinal: this.formularioReserva.controls.hora_final.value,
        alquilaInstrumentos: this.mostrarInstrumentos,
        instrumentos: this.formularioReserva.controls.instrumento.value,
        cantidad: this.formularioReserva.controls.cantidad.value,
        totalTarifa: this.totalTarifa,
        totalTarifaExtra: this.totalTarifaExtra,
        total: this.totalTarifa + this.totalTarifaExtra,
        sala: this.formularioReserva.controls.sala.value
    };
    this.validarReserva(reserva);
  }

  validarReserva(reserva: Reserva) {
    this.reservaService.consultarReservaPorFiltros(reserva).subscribe(res => {
      if (res.length > 0) {
        swal.fire({
          position: 'bottom-end',
          icon: 'warning',
          title: 'Ya existe una reserva para la fecha y hora escogida',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.guardarReserva(reserva);
      }
    });
  }


  guardarReserva(reserva: Reserva) {
    this.reservaService.guardar(reserva).subscribe((res) => {
      if (res) {
        swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Guardado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/reserva']);
      }
    });
  }
}
