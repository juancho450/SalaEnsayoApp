import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Items } from '@shared/model/items';
import { environment } from '../../../../environments/environment';


@Injectable()
export class ListadoService {

  constructor(protected http: HttpService) {}

  public consultar(componente: string) {
    return this.http.doGet<Items[]>(`${environment.endpoint_json_server}/${componente}`, this.http.optsName('Consultar reservas'));
  }

  public eliminar(id: number, componente: string) {
    return this.http.doDelete<boolean>(`${environment.endpoint_json_server}/${componente}/${id}`,
                                                 this.http.optsName('Eliminar reserva'));
  }
}
