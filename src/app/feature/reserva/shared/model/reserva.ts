export class Reserva {
    id?: string;
    nombre: string;
    fecha: string;
    horaInicial: number;
    horaFinal: number;
    alquilaInstrumentos: boolean;
    instrumentos: any;
    cantidad: number;
    totalTarifa: number;
    totalTarifaExtra: number;


    constructor(nombre: string, fecha: string, horaInicial: number, horaFinal: number, alquilaInstrumentos: boolean,
                instrumentos: any[], cantidad: number, totalTarifa: number, totalTarifaExtra: number, id?: string) {
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
    }
}
