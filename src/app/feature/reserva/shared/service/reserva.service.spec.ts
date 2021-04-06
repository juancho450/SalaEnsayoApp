import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReservaService } from './reserva.service';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../../app/core/services/http.service';
import { Reserva } from '../model/reserva';
import { HttpResponse } from '@angular/common/http';

describe('ReservaService', () => {
  let httpMock: HttpTestingController;
  let service: ReservaService;
  const apiEndpointReservas = `${environment.endpoint_json_server}/reservas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    const reservaService: ReservaService = TestBed.inject(ReservaService);
    expect(reservaService).toBeTruthy();
  });

  it('Deberia consultar reservas por id', () => {
    const dummyIdReserva = '1';
    const dummyReserva = new Reserva('Banda 1', '2021-03-30T05:00:00.000Z', 8, 9, false, null, null, 15000, 0, 15000, 'Sala 1', 1);

    service.consultarReserva(dummyIdReserva).subscribe(reservas => {
      expect(reservas).toBeTruthy();
      expect(reservas).toEqual(dummyReserva);
    });

    const req = httpMock.expectOne(`${apiEndpointReservas}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReserva);
  });

  it('Deberia consultar reservas por filtros', () => {
    const dummyReserva = new Reserva('Banda 1', '2021-03-30T05:00:00.000Z', 8, 9, false, null, null, 15000, 0, 15000, 'Sala 1', 1);

    service.consultarReservaPorFiltros(dummyReserva).subscribe(reservas => {
      expect(reservas.length).toBe(1);
      expect(reservas).toEqual([dummyReserva]);
    });

    const req = httpMock.expectOne({method: 'GET'});
    expect(req.request.method).toBe('GET');
    req.flush([dummyReserva]);
  });

  it('Deberia actualizar una reserva', () => {
    const dummyReserva = new Reserva('Banda 1', '2021-03-30T05:00:00.000Z', 8, 9, false, null, null, 15000, 0, 15000, 'Sala 1', 1);

    service.guardar(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointReservas}/1`);
    expect(req.request.method).toBe('PATCH');
    req.event(new HttpResponse<boolean>({body: true}));
  });


  it('Deberia guardar una reserva', () => {
    const dummyReserva = new Reserva('Banda 1', '2021-03-30T05:00:00.000Z', 8, 9, false, null, null, 15000, 0, 15000, 'Sala 1', null);

    service.guardar(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
