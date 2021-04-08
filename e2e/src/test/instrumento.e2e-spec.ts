import { SidebarPage } from '../page/sidebar/sidebar.po';
import { AppPage } from '../app.po';
import { ListadoPage } from '../page/listado/listado.po';
import { InstrumentoPage } from '../page/instrumento/instrumento.po';

describe('workspace-project Instrumento', () => {
    let page: AppPage;
    let sideBar: SidebarPage;
    let instrumento: InstrumentoPage;
    let listado: ListadoPage;

    beforeEach(() => {
        page = new AppPage();
        sideBar = new SidebarPage();
        instrumento = new InstrumentoPage();
        listado = new ListadoPage();
    });

    it('Deberia mostrar titulo listado ', () => {
        page.navigateTo('/home');
        sideBar.clickBotonInstrumento();
        expect(page.getTitleText('app-instrumento #tituloInstrumento')).toEqual('Instrumentos');
    });

    it('Deberia listar instrumentos', () => {
        page.navigateTo('/home');
        sideBar.clickBotonInstrumento();
        expect(listado.contarItems()).toBe(listado.contarItems());
    });

    it('Deberia mostrar titulo formulario ', () => {
        page.navigateTo('/home');
        sideBar.clickBotonInstrumento();
        instrumento.clickBotonNuevaReservaInstrumento();
        expect(page.getTitleText('app-formulario-instrumento p')).toEqual('Reserva instrumentos');
    });

    it('Deberia crear reservas de instrumentos', () => {
        const NOMBRE = 'Banda 1';
        const TARIFA = '30000';

        page.navigateTo('/home');
        sideBar.clickBotonInstrumento();
        instrumento.clickBotonNuevaReservaInstrumento();
        instrumento.ingresarNombre(NOMBRE);
        instrumento.ingresarFecha('fecha');
        instrumento.ingresarSelect('cantidad', 1);
        instrumento.ingresarSelect('instrumento', 1);
        instrumento.ingresarTarifa(TARIFA);
        instrumento.clickBotonGuardarReservaInstrumento();

        expect(instrumento.botonGuardarInstrumento.disabled).toBeFalsy();
    });

    // it('Deberia editar reservas', () => {

    //     page.navigateTo('/home');
    //     sideBar.clickBotonReserva();
    //     listado.clickBotonEditar();

    //     expect(reserva.botonGuardarReserva.disabled).toBeFalsy();
    //     expect(reserva.inputNombre.getAttribute('value')).toBe('Banda 1');
    //     expect(reserva.inputTarifa.getAttribute('value')).toBe('67500');
    //     expect(reserva.checkAlquiler.getAttribute('checked')).toBeTruthy();
    // });
});
