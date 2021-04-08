import { AppPage } from '../app.po';

describe('workspace-project Home', () => {
    let page: AppPage;


    beforeEach(() => {
        page = new AppPage();
    });

    it('Deberia mostrar la TRM ', () => {
        page.navigateTo('/home');
        expect(page.getTitleText('app-trm #TRM')).toContain('La TRM es:');
    });
});
