export class Reserva {
    id?: number;
    nombre: string;
    fecha: string;
    horaInicial: number;
    horaFinal: number;
    alquilaInstrumentos: boolean;
    instrumentos: string[];
    cantidad: number;
    totalTarifa: number;
    totalTarifaExtra: number;
    total: number;
    sala: string;


    constructor(nombre: string, fecha: string, horaInicial: number, horaFinal: number, alquilaInstrumentos: boolean,
                instrumentos: string[], cantidad: number, totalTarifa: number, totalTarifaExtra: number, total: number,
                sala: string, id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.horaInicial = horaInicial;
        this.horaFinal = horaFinal;
        this.alquilaInstrumentos = alquilaInstrumentos;
        this.instrumentos = instrumentos;
        this.cantidad = cantidad;
        this.totalTarifa = totalTarifa;
        this.totalTarifaExtra = totalTarifaExtra;
        this.total = total;
        this.sala = sala;
    }
}
