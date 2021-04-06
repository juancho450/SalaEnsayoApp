import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '../../shared/service/reserva.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioReservaComponent } from './formulario-reserva.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Hora } from '@shared/model/hora';
import { Cantidad } from '@shared/model/cantidad';
import { Instrumento } from '@shared/model/instrumentos';
import { Reserva } from '../../shared/model/reserva';
import { Sala } from '../../shared/model/sala';
import { Router } from '@angular/router';

describe('FormularioReservaComponent', () => {
  let component: FormularioReservaComponent;
  let fixture: ComponentFixture<FormularioReservaComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgbModule, NgSelectModule, ReactiveFormsModule],
      declarations: [ FormularioReservaComponent ],
      providers: [
        ReservaService,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioReservaComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia inicializar cargar datos on init', () => {
    const spyMethod = spyOn(component, 'cargarDatos');
    component.id = '1';

    component.ngOnInit();

    expect(component.id).toBeTruthy();
    expect (spyMethod).toHaveBeenCalled();
  });


  it('Deberia obtener horas', () => {
    const horas = [
      new Hora(1 , 8)
    ];

    spyOn(component.reservaService, 'consultarHoras').and.returnValue(of(horas));

    component.obtenerHoras();

    expect(component.horaInicial).toEqual(horas);
  });

  it('Deberia obtener cantidades', () => {
    const cantidades = [
      new Cantidad(1 , 4)
    ];

    spyOn(component.reservaService, 'consultarCantidades').and.returnValue(of(cantidades));

    component.obtenerCantidades();

    expect(component.cantidades).toEqual(cantidades);
  });

  it('Deberia obtener instrumentos', () => {
    const instrumentos = [
      new Instrumento(1 , 'Guitarra acustica')
    ];

    spyOn(component.reservaService, 'consultarInstrumentos').and.returnValue(of(instrumentos));

    component.obtenerInstrumentos();

    expect(component.instrumentos).toEqual(instrumentos);
  });

  it('Deberia obtener salas', () => {
    const salas = [
      new Sala(1 , 'Sala 1')
    ];

    spyOn(component.reservaService, 'consultarSalas').and.returnValue(of(salas));

    component.obtenerSalas();

    expect(component.salas).toEqual(salas);
  });

  it('Deberia guardar reservas', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, 25000, '2');
    const spyService = spyOn(component.reservaService, 'guardar').and.returnValue(of(true));
    const spyNavigate = spyOn(router, 'navigate');

    component.guardarReserva(reservas);
    expect(spyService).toBeTruthy();
    expect(spyNavigate).toHaveBeenCalled();
  });

  it('Deberia guardar reservas error', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, 25000, '2');
    const spyService = spyOn(component.reservaService, 'guardar').and.returnValue(throwError({error: 'error'}));

    component.guardarReserva(reservas);
    expect(spyService).toBeTruthy();
  });

  it('Deberia validar reservas if', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, 25000, '2');
    const spyService = spyOn(component.reservaService, 'consultarReservaPorFiltros').and.returnValue(of([reservas]));

    component.validarReserva(reservas);
    expect(spyService).toBeTruthy();
  });

  it('Deberia validar reservas else', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, 25000, '2');
    const spyService = spyOn(component.reservaService, 'consultarReservaPorFiltros').and.returnValue(of([]));
    const spyMethod = spyOn(component, 'guardarReserva');

    component.validarReserva(reservas);
    expect(spyService).toBeTruthy();
    expect(spyMethod).toHaveBeenCalled();
  });

  it('Deberia cambiar checkbox', () => {
    const checked = true;
    const spyMethod = spyOn(component, 'establecerValidacionesInstrumentos');

    component.cambiarCheckbox(checked);

    expect(component.mostrarInstrumentos).toEqual(checked);
    expect(spyMethod).toHaveBeenCalled();

  });

  it('Deberia establecer validaciones instrumentos if', () => {
    component.mostrarInstrumentos = true;

    component.establecerValidacionesInstrumentos();

    expect(component.formularioReserva.controls.cantidad.errors.required).toBeTruthy();
    expect(component.formularioReserva.controls.instrumento.errors.required).toBeTruthy();

  });

  it('Deberia establecer validaciones instrumentos else', () => {
    component.mostrarInstrumentos = false;
    const spyMethod = spyOn(component, 'calcularTarifaExtra');


    component.establecerValidacionesInstrumentos();

    expect(component.formularioReserva.controls.cantidad.errors).toBeNull();
    expect(component.formularioReserva.controls.instrumento.errors).toBeNull();
    expect(component.totalTarifaExtra).toEqual(0);
    expect(spyMethod).toHaveBeenCalled();

  });

  it('Deberia establecer total tarifa if', () => {
    component.totalTarifaExtra = 1500;
    component.totalTarifa = 1500;
    const total = component.totalTarifaExtra + component.totalTarifa;

    component.establecerTotalTarifa();

    expect(component.formularioReserva.controls.tarifa.value).toEqual(total);

  });

  it('Deberia establecer total tarifa else', () => {
    component.totalTarifaExtra = 0;
    component.totalTarifa = 1500;

    component.establecerTotalTarifa();

    expect(component.formularioReserva.controls.tarifa.value).toEqual(component.totalTarifa);

  });

  it('Deberia calcular tarifa extra if', () => {
    const TARIFA_INSTRUMENTO = 5000;
    const cantidad = 2;
    component.totalTarifaExtra = cantidad * TARIFA_INSTRUMENTO;
    component.totalTarifa = 1500;
    const total = component.totalTarifaExtra + component.totalTarifa;

    component.calcularTarifaExtra(cantidad);

    expect(component.formularioReserva.controls.tarifa.value).toEqual(total);

  });

  it('Deberia calcular tarifa extra else', () => {
    const TARIFA_INSTRUMENTO = 5000;
    const cantidad = 2;
    component.totalTarifaExtra = cantidad * TARIFA_INSTRUMENTO;
    component.totalTarifa = 0;

    component.calcularTarifaExtra(cantidad);

    expect(component.formularioReserva.controls.tarifa.value).toEqual(component.totalTarifaExtra);

  });

  it('Deberia guardar', () => {
    const fecha = {year: 2021, day: 6, month: 4};
    component.formularioReserva.controls.fecha.setValue(fecha);
    const spyMethod = spyOn(component, 'validarReserva');

    component.guardar();

    expect(spyMethod).toHaveBeenCalled();
  });

  it('Deberia cargar datos ', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, 25000, 'Sala 1', 1);

    const spyService = spyOn(component.reservaService, 'consultarReserva').and.returnValue(of(reservas));

    component.cargarDatos();

    expect(spyService).toBeTruthy();
  });
});
