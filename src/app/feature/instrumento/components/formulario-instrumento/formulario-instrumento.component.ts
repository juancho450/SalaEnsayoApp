import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cantidad } from '@shared/model/cantidad';
import { Instrumento } from '@shared/model/instrumentos';
import { Instrumentos } from '../../shared/model/instrumento';
import { InstrumentoService } from '../../shared/service/instrumento.service';
import swal from 'sweetalert2';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

const TARFIFA_INSTRUMENTO = 5000;
const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 50;
const LIMITE_MES = 3;


@Component({
  selector: 'app-formulario-instrumento',
  templateUrl: './formulario-instrumento.component.html'
})
export class FormularioInstrumentoComponent implements OnInit {
  formularioInstrumento: FormGroup;
  private fecha = new Date();
  public fechaMinima = { year: this.fecha.getFullYear(), month: this.fecha.getMonth() + 1, day: this.fecha.getDate() + 1};
  public fechaMaxima = { year: this.fecha.getFullYear(), month: this.fecha.getMonth() + LIMITE_MES, day: this.fecha.getDate() };
  public cantidades: Cantidad[];
  public instrumentos: Instrumento[];
  public totalTarifa: number;
  public id: string;

  constructor(public instrumentoServicio: InstrumentoService, private router: Router,  public activatedRoute: ActivatedRoute) {
    this.totalTarifa = 0;
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
   }

  ngOnInit(): void {
    this.construirFormulario();
    this.obtenerCantidades();
    this.obtenerInstrumentos();

    if (this.id) {
      this.cargarDatos();
    }
  }

  private construirFormulario() {
    this.formularioInstrumento = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                          Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      fecha: new FormControl(null, [Validators.required]),
      tarifa:  new FormControl(0),
      cantidad: new FormControl(null, [Validators.required]),
      instrumento: new FormControl(null, [Validators.required]),
    });
  }

  public cargarDatos() {
    this.instrumentoServicio.consultarInstrumento(this.id).subscribe(res => {
      const fecha = {
        year: new Date(res.fecha).getFullYear(),
        month: new Date(res.fecha).getMonth() + 1,
        day: new Date(res.fecha).getDate(),
      };
      this.formularioInstrumento.controls.nombre.setValue(res.nombre);
      this.formularioInstrumento.controls.fecha.setValue(fecha);
      this.formularioInstrumento.controls.cantidad.setValue(res.cantidad);
      this.totalTarifa = res.total;
      this.calcularTarifa(res.cantidad);
      setTimeout(() => {
        this.formularioInstrumento.controls.instrumento.setValue(res.instrumentos);
      });
    });
  }

  public obtenerCantidades() {
    this.instrumentoServicio.consultarCantidades().subscribe(res => {
      this.cantidades = res;
    });
  }

  public obtenerInstrumentos() {
    this.instrumentoServicio.consultarInstrumentos().subscribe(res => {
      this.instrumentos = res;
    });
  }

  calcularTarifa(cantidad: number) {
    this.totalTarifa = cantidad * TARFIFA_INSTRUMENTO;
    this.formularioInstrumento.controls.tarifa.setValue(this.totalTarifa);
  }

  abrirDatePicker(id: NgbInputDatepicker) {
    id.toggle();
  }

  guardar() {
    const {year , month , day} = this.formularioInstrumento.controls.fecha.value;
    const instrumento: Instrumentos = {
        id: typeof this.id !== 'undefined' ? Number(this.id) : null,
        nombre: this.formularioInstrumento.controls.nombre.value,
        instrumentos: this.formularioInstrumento.controls.instrumento.value,
        cantidad: this.formularioInstrumento.controls.cantidad?.value,
        total: this.totalTarifa,
        fecha: new Date(year , month - 1 , day).toISOString(),
    };

    this.guardarInstrumento(instrumento);
  }


  guardarInstrumento(instrumento: Instrumentos) {
    this.instrumentoServicio.guardar(instrumento).subscribe((res) => {
      if (res) {
        swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Guardado con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/instrumento']);
      }
    });
  }
}
