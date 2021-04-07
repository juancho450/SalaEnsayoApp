import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Cantidad } from '@shared/model/cantidad';
import { Instrumento } from '@shared/model/instrumentos';
import { Router } from '@angular/router';
import { FormularioInstrumentoComponent } from './formulario-instrumento.component';
import { InstrumentoService } from '../../shared/service/instrumento.service';
import { Instrumentos } from '../../shared/model/instrumento';

describe('FormularioInstrumentoComponent', () => {
  let component: FormularioInstrumentoComponent;
  let fixture: ComponentFixture<FormularioInstrumentoComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgbModule, NgSelectModule, ReactiveFormsModule],
      declarations: [ FormularioInstrumentoComponent ],
      providers: [
        InstrumentoService,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioInstrumentoComponent);
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


  it('Deberia obtener cantidades', () => {
    const cantidades = [
      new Cantidad(1 , 4)
    ];

    spyOn(component.instrumentoServicio, 'consultarCantidades').and.returnValue(of(cantidades));

    component.obtenerCantidades();

    expect(component.cantidades).toEqual(cantidades);
  });

  it('Deberia obtener instrumentos', () => {
    const instrumentos = [
      new Instrumento(1 , 'Guitarra acustica')
    ];

    spyOn(component.instrumentoServicio, 'consultarInstrumentos').and.returnValue(of(instrumentos));

    component.obtenerInstrumentos();

    expect(component.instrumentos).toEqual(instrumentos);
  });


  it('Deberia guardar instrumento', () => {
    const instrumentos = new Instrumentos('Banda 2', ['Bajo', 'Ukelele'], 2, 10000,  '2021-03-30T05:00:00.000Z', 1);
    const spyService = spyOn(component.instrumentoServicio, 'guardar').and.returnValue(of(true));
    const spyNavigate = spyOn(router, 'navigate');

    component.guardarInstrumento(instrumentos);
    expect(spyService).toBeTruthy();
    expect(spyNavigate).toHaveBeenCalled();
  });


  it('Deberia calcular tarifa', () => {
    const cantidad = 3;
    const TARIFA_INSTRUMENTO = 5000;
    component.totalTarifa = cantidad * TARIFA_INSTRUMENTO;

    component.calcularTarifa(cantidad);

    expect(component.formularioInstrumento.controls.tarifa.value).toEqual(component.totalTarifa);

  });

  it('Deberia guardar', () => {
    const fecha = {year: 2021, day: 6, month: 4};
    component.formularioInstrumento.controls.fecha.setValue(fecha);
    const spyMethod = spyOn(component, 'guardarInstrumento');

    component.guardar();

    expect(spyMethod).toHaveBeenCalled();
  });

  it('Deberia cargar datos ', () => {
    const instrumentos = new Instrumentos('Banda 2', ['Bajo', 'Ukelele'], 2, 10000,  '2021-03-30T05:00:00.000Z', 1);

    const spyService = spyOn(component.instrumentoServicio, 'consultarInstrumento').and.returnValue(of(instrumentos));

    component.cargarDatos();

    expect(spyService).toBeTruthy();
  });
});
