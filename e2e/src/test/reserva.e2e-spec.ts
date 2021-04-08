import { SidebarPage } from '../page/sidebar/sidebar.po';
import { AppPage } from '../app.po';
import { ReservaPage } from '../page/reserva/reserva.po';
import { ListadoPage } from '../page/listado/listado.po';

describe('workspace-project Reserva', () => {
    let page: AppPage;
    let sideBar: SidebarPage;
    let reserva: ReservaPage;
    let listado: ListadoPage;

    beforeEach(() => {
        page = new AppPage();
        sideBar = new SidebarPage();
        reserva = new ReservaPage();
        listado = new ListadoPage();
    });

    it('Deberia mostrar titulo listado ', () => {
        page.navigateTo('/home');
        sideBar.clickBotonReserva();
        expect(page.getTitleText('app-reserva #tituloReserva')).toEqual('Reservas');
    });

    it('Deberia listar reservas', () => {
        page.navigateTo('/home');
        sideBar.clickBotonReserva();
        expect(listado.contarItems()).toBe(listado.contarItems());
    });

    it('Deberia mostrar titulo formulario ', () => {
        page.navigateTo('/home');
        sideBar.clickBotonReserva();
        reserva.clickBotonNuevaReserva();
        expect(page.getTitleText('app-formulario-reserva p')).toEqual('Reserva');
    });

    it('Deberia crear reservas sin instrumentos', () => {
        const NOMBRE = 'Banda 1';
        const TARIFA = '30000';

        page.navigateTo('/home');
        sideBar.clickBotonReserva();
        reserva.clickBotonNuevaReserva();
        reserva.ingresarNombre(NOMBRE);
        reserva.ingresarFecha('fecha');
        reserva.ingresarSelect('sala', 2);
        reserva.ingresarSelect('hora_inicial', 1);
        reserva.ingresarSelect('hora_final', 1);
        reserva.ingresarTarifa(TARIFA);
        reserva.clickBotonGuardarReserva();

        expect(reserva.botonGuardarReserva.disabled).toBeFalsy();
    });

    it('Deberia crear reservas con instrumentos', () => {
        const NOMBRE = 'Banda 1';
        const TARIFA = '30000';

        page.navigateTo('/home');
        sideBar.clickBotonReserva();
        reserva.clickBotonNuevaReserva();
        reserva.ingresarNombre(NOMBRE);
        reserva.ingresarFecha('fecha');
        reserva.ingresarSelect('sala', 2);
        reserva.ingresarSelect('hora_inicial', 1);
        reserva.ingresarSelect('hora_final', 1);
        reserva.checkearAlquiler();
        reserva.ingresarSelect('cantidad', 1);
        reserva.ingresarSelect('instrumento', 1);
        reserva.ingresarTarifa(TARIFA);
        reserva.clickBotonGuardarReserva();

        expect(reserva.botonGuardarReserva.disabled).toBeFalsy();
    });

    it('Deberia editar reservas', () => {

        page.navigateTo('/home');
        sideBar.clickBotonReserva();
        listado.clickBotonEditar();

        expect(reserva.botonGuardarReserva.disabled).toBeFalsy();
        expect(reserva.inputNombre.getAttribute('value')).toBe('Banda 1');
        expect(reserva.inputTarifa.getAttribute('value')).toBe('67500');
        expect(reserva.checkAlquiler.getAttribute('checked')).toBeTruthy();
    });
});
