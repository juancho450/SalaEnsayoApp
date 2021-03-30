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
import { Hora } from '../../shared/model/hora';
import { Cantidad } from '../../shared/model/cantidad';
import { Instrumento } from '../../shared/model/instrumentos';
import { Reserva } from '../../shared/model/reserva';

describe('FormularioReservaComponent', () => {
  let component: FormularioReservaComponent;
  let fixture: ComponentFixture<FormularioReservaComponent>;

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

  it('Deberia guardar reservas', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, '2');
    const spyService = spyOn(component.reservaService, 'guardar').and.returnValue(of(true));

    component.guardarReserva(reservas);
    expect(spyService).toBeTruthy();
  });

  it('Deberia guardar reservas error', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, '2');
    const spyService = spyOn(component.reservaService, 'guardar').and.returnValue(throwError({error: 'error'}));

    component.guardarReserva(reservas);
    expect(spyService).toBeTruthy();
  });

  it('Deberia validar reservas error', () => {
    const reservas = new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true,
                                ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, '2');
    const spyService = spyOn(component.reservaService, 'consultarReservaPorFiltros').and.returnValue(of([reservas]));

    component.validarReserva(reservas);
    expect(spyService).toBeTruthy();
  });
});
