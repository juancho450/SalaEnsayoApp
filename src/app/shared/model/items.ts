export class Items {
    id?: number;
    nombre: string;
    fecha: string;
    horaInicial?: number;
    horaFinal?: number;
    alquilaInstrumentos?: boolean;
    total: number;
    cantidad?: number;

    constructor(nombre: string, fecha: string, total: number, id?: number,  horaInicial?: number, horaFinal?: number,
                alquilaInstrumentos?: boolean, cantidad?: number) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.horaInicial = horaInicial;
        this.horaFinal = horaFinal;
        this.alquilaInstrumentos = alquilaInstrumentos;
        this.total = total;
        this.cantidad = cantidad;
    }
}
