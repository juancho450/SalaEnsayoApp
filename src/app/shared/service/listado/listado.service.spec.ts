import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import { ListadoService } from './listado.service';
import { Items } from '@shared/model/items';
import { HttpService } from '@core/services/http.service';

describe('ListadoService', () => {
  let httpMock: HttpTestingController;
  let service: ListadoService;
  const apiEndpointReservas = `${environment.endpoint_json_server}/reservas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListadoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ListadoService);
  });

  it('should be created', () => {
    const listadoService: ListadoService = TestBed.inject(ListadoService);
    expect(listadoService).toBeTruthy();
  });

  it('Deberia consultar', () => {
    const componente = 'reservas';
    const dummyItems = [
      new Items('Banda 1', '2021-03-30T05:00:00.000Z', 15000, 1, 8, 9, false, 3),
    ];

    service.consultar(componente).subscribe(items => {
      expect(dummyItems.length).toBe(1);
      expect(items).toEqual(dummyItems);
    });

    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('GET');
    req.flush(dummyItems);
  });

  it('Deberia eliminar', () => {
    const dummyId = 1;
    const componente = 'reservas';

    service.eliminar(dummyId, componente).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });

    const req = httpMock.expectOne(`${apiEndpointReservas}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
