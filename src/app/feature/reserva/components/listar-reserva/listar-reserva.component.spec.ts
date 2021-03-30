import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';

import { ListarReservaComponent } from './listar-reserva.component';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ListarReservaComponent ],
      providers: [
        ReservaService,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia inicializar on Init', () => {
    const spyMethod = spyOn(component, 'obtenerReservas');

    component.ngOnInit();

    expect(spyMethod).toHaveBeenCalled();
  });

  it('Deberia obtener reservas', () => {
    const reservas = [
      new Reserva('Banda 1', '2021-03-30T05:00:00.000Z', 8, 9, false, null, null, 15000, 0, '1'),
      new Reserva('Banda 2', '2021-03-30T05:00:00.000Z', 10, 11, true, ['Guitarra acustica', 'Ukelele'], 2, 15000, 10000, '2'),
    ];

    spyOn(component.reservaService, 'consultarReservas').and.returnValue(of(reservas));

    component.obtenerReservas();

    expect(component.reservas).toEqual(reservas);
  });

  it('Deberia eliminar reserva', () => {
    const reserva = new Reserva('Banda 1', '2021-03-30T05:00:00.000Z', 8, 9, false, null, null, 15000, 0, '1');
    const reservaService = spyOn(component.reservaService, 'eliminar').and.returnValue(of(true));

    component.eliminarReserva(reserva);

    expect(reservaService).toBeTruthy();
  });

  it('Deberia editar reserva', () => {
    const dummyReserva = new Reserva('Banda 1', '2021-03-30T05:00:00.000Z', 8, 9, false, null, null, 15000, 0, '1');
    const spyNavigate = spyOn(router, 'navigateByUrl');

    component.editarReserva(dummyReserva);

    expect(spyNavigate).toHaveBeenCalledTimes(1);
  });
});
