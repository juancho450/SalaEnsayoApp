export class Instrumentos {
    id?: number;
    nombre: string;
    instrumentos: string[];
    cantidad: number;
    total: number;
    fecha: string;

    constructor(nombre: string, instrumentos: string[], cantidad: number, total: number, fecha: string, id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.instrumentos = instrumentos;
        this.cantidad = cantidad;
        this.total = total;
        this.fecha = fecha;
    }
}
