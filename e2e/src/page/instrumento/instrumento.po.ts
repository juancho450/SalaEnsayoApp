import { by, element } from 'protractor';

export class InstrumentoPage {
    public botonNuevoInstrumento = element(by.css('app-instrumento #nuevaReservaInstrumento'));
    public botonGuardarInstrumento = element(by.css('app-formulario-instrumento #guardarReservaInstrumento'));
    public inputNombre = element(by.id('nombre'));
    public inputTarifa = element(by.id('tarifa'));
    public checkAlquiler = element(by.id('gridCheck'));

    async clickBotonNuevaReservaInstrumento() {
        await this.botonNuevoInstrumento.click();
    }

    async clickBotonGuardarReservaInstrumento() {
        await this.botonGuardarInstrumento.click();
    }

    async ingresarNombre(nombre: string) {
        await this.inputNombre.sendKeys(nombre);
    }

    async ingresarSelect(name: string, offset: number) {
        await element(
            by.css('[formcontrolname="' + name + '"] span.ng-arrow-wrapper')
        ).click();

        await element(
            by.css(
                '[formcontrolname="' +
                name +
                '"] .ng-option:nth-child(' +
                offset +
                ')'
            )
        ).click();
    }

    async ingresarTarifa(tarifa: string) {
        await this.inputTarifa.sendKeys(tarifa);
    }

    async ingresarFecha(name: string) {

        await element(by.css('[formcontrolname="' + name + '"]')).click();

        await element(
            by.css(
                '.ngb-dp-week:nth-child(4) .ngb-dp-day:nth-child(1)'
            )
        ).click();
    }
}
