export class TRM {
    unidad: string;
    valor: string;
    vigenciadesde: string;
    vigenciahasta: string;

    constructor(unidad: string, valor: string, vigenciadesde: string, vigenciahasta: string) {
        this.unidad = unidad;
        this.valor = valor;
        this.vigenciadesde = vigenciadesde;
        this.vigenciahasta = vigenciahasta;
    }
}
