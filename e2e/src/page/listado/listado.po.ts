import { by, element } from 'protractor';

export class ListadoPage {
    private listaItems = element.all(by.css('table tbody tr'));
    private botonEditar = element(by.css('app-listado .editar'));

    async contarItems() {
        return this.listaItems.count();
    }

    async clickBotonEditar() {
        await this.botonEditar.click();
    }
}
