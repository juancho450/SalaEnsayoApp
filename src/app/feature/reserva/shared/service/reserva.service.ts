import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Cantidad } from '@shared/model/cantidad';
import { Hora } from '@shared/model/hora';
import { Instrumento } from '@shared/model/instrumentos';
import { Reserva } from '../model/reserva';
import { Sala } from '../model/sala';


@Injectable()
export class ReservaService {

  constructor(protected http: HttpService) {}

  public consultarReserva(id: string) {
    return this.http.doGet<Reserva>(`${environment.endpoint_json_server}/reservas/${id}`, this.http.optsName('Consultar reserva'));
  }

  public consultarReservaPorFiltros(reserva: Reserva) {
    return this.http.doGet<Reserva[]>(`${environment.endpoint_json_server}/reservas?sala=${reserva.sala}&&
                                      fecha=${reserva.fecha}&&horaInicial=${reserva.horaInicial}&&horaFinal=${reserva.horaFinal}`,
                                                                             this.http.optsName('Consultar reserva por filtros'));
  }

  public consultarHoras() {
    return this.http.doGet<Hora[]>(`${environment.endpoint_json_server}/horas`, this.http.optsName('Consultar horas'));
  }

  public consultarCantidades() {
    return this.http.doGet<Cantidad[]>(`${environment.endpoint_json_server}/cantidades`, this.http.optsName('Consultar cantidades'));
  }

  public consultarInstrumentos() {
    return this.http.doGet<Instrumento[]>(`${environment.endpoint_json_server}/instrumentos`, this.http.optsName('Consultar instrumentos'));
  }

  public consultarSalas() {
    return this.http.doGet<Sala[]>(`${environment.endpoint_json_server}/salas`, this.http.optsName('Consultar salas de ensayo'));
  }

  public guardar(reserva: Reserva) {
    if (reserva.id !== null) {
      return this.http.doPatch<Reserva, boolean>(`${environment.endpoint_json_server}/reservas/${reserva.id}`, reserva,
                                                                              this.http.optsName('Actualziar reserva'));
    } else {
      return this.http.doPost<Reserva, boolean>(`${environment.endpoint_json_server}/reservas`, reserva,
                                                                                      this.http.optsName('Crear reserva'));
    }
  }
}
