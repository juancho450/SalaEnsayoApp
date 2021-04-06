import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../../app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { InstrumentoService } from './instrumento.service';
import { Instrumentos } from '../model/instrumento';
import { Cantidad } from '@shared/model/cantidad';
import { Instrumento } from '@shared/model/instrumentos';

describe('InstrumentoService', () => {
  let httpMock: HttpTestingController;
  let service: InstrumentoService;
  const apiEndpointInstrumento = `${environment.endpoint_json_server}/instrumento`;
  const apiEndpointCantidades = `${environment.endpoint_json_server}/cantidades`;
  const apiEndpointInstrumentos = `${environment.endpoint_json_server}/instrumentos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstrumentoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(InstrumentoService);
  });

  it('should be created', () => {
    const instrumentoService: InstrumentoService = TestBed.inject(InstrumentoService);
    expect(instrumentoService).toBeTruthy();
  });

  it('Deberia consultar instrumento por id', () => {
    const dummyIdInstrumento = '1';
    const dummyInstrumento = new Instrumentos('Banda 1', ['Guitarra acustica', 'Ukelele'], 2, 10000, '2021-03-30T05:00:00.000Z', 1);

    service.consultarInstrumento(dummyIdInstrumento).subscribe(instrumentos => {
      expect(instrumentos).toBeTruthy();
      expect(instrumentos).toEqual(dummyInstrumento);
    });

    const req = httpMock.expectOne(`${apiEndpointInstrumento}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInstrumento);
  });

  it('Deberia actualizar un instrumento', () => {
    const dummyInstrumento = new Instrumentos('Banda 1', ['Guitarra acustica', 'Ukelele'], 2, 10000, '2021-03-30T05:00:00.000Z', 1);

    service.guardar(dummyInstrumento).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointInstrumento}/1`);
    expect(req.request.method).toBe('PATCH');
    req.event(new HttpResponse<boolean>({body: true}));
  });


  it('Deberia guardar un instrumento', () => {
    const dummyInstrumento = new Instrumentos('Banda 1', ['Guitarra acustica', 'Ukelele'], 2, 10000, '2021-03-30T05:00:00.000Z');

    service.guardar(dummyInstrumento).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointInstrumento);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('Deberia consultar cantidades', () => {
    const dummyCantidades = [
      new Cantidad(1, 1),
      new Cantidad(2, 2),
    ];

    service.consultarCantidades().subscribe(cantidades => {
      expect(dummyCantidades.length).toBe(2);
      expect(cantidades).toEqual(dummyCantidades);
    });

    const req = httpMock.expectOne(apiEndpointCantidades);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCantidades);
  });

  it('Deberia consultar instrumentos', () => {
    const dummyInstrumentos = [
      new Instrumento(1, 'Bajo'),
      new Instrumento(2, 'Ukele'),
    ];

    service.consultarInstrumentos().subscribe(instrumentos => {
      expect(dummyInstrumentos.length).toBe(2);
      expect(instrumentos).toEqual(dummyInstrumentos);
    });

    const req = httpMock.expectOne(apiEndpointInstrumentos);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInstrumentos);
  });
});
