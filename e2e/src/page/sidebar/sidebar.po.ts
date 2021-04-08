import { by, element } from 'protractor';

export class SidebarPage {
    linkHome = element(by.css('app-side-bar #Home'));
    linkReserva = element(by.css('app-side-bar #Reservas'));
    linkInstrumento = element(by.css('app-side-bar #Instrumentos'));

    async clickBotonHome() {
        await this.linkHome.click();
    }

    async clickBotonReserva() {
        await this.linkReserva.click();
    }

    async clickBotonInstrumento() {
        await this.linkInstrumento.click();
    }
}
