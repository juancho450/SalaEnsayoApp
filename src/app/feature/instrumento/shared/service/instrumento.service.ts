import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Cantidad } from '@shared/model/cantidad';
import { Instrumento } from '@shared/model/instrumentos';
import { Instrumentos } from '../model/instrumento';


@Injectable()
export class InstrumentoService {

  constructor(protected http: HttpService) {}

  public consultarInstrumento(id: string) {
    return this.http.doGet<Instrumentos>(`${environment.endpoint_json_server}/instrumento/${id}`,
                                          this.http.optsName('Consultar instrumento'));
  }

  public consultarCantidades() {
    return this.http.doGet<Cantidad[]>(`${environment.endpoint_json_server}/cantidades`, this.http.optsName('Consultar cantidades'));
  }

  public consultarInstrumentos() {
    return this.http.doGet<Instrumento[]>(`${environment.endpoint_json_server}/instrumentos`, this.http.optsName('Consultar instrumentos'));
  }

  public guardar(instrumento: Instrumentos) {
    if (typeof instrumento.id !== 'undefined') {
      return this.http.doPatch<Instrumentos, boolean>(`${environment.endpoint_json_server}/instrumento/${instrumento.id}`, instrumento,
                                                                              this.http.optsName('Actualizar instrumento'));
    } else {
      return this.http.doPost<Instrumentos, boolean>(`${environment.endpoint_json_server}/instrumento`, instrumento,
                                                                                      this.http.optsName('Crear instrumento'));
    }
  }
}
