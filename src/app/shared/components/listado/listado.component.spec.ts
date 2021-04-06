import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Items } from '@shared/model/items';
import { of } from 'rxjs';
import { ReservaService } from '../../../feature/reserva/shared/service/reserva.service';
import { ListadoComponent } from './listado.component';


describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ListadoComponent ],
      providers: [
        ReservaService,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia inicializar on Init', () => {
    const spyMethod = spyOn(component, 'obtener');

    component.ngOnInit();

    expect(spyMethod).toHaveBeenCalled();
  });

  it('Deberia obtener datos', () => {
    const items = [
      new Items('Banda 1', '2021-03-30T05:00:00.000Z', 15000, 1, 8, 10, true),
      new Items('Banda 2', '2021-03-30T05:00:00.000Z', 15000, 2, null, null, null, 3),
    ];

    spyOn(component.listadoServicio, 'consultar').and.returnValue(of(items));

    component.obtener();

    expect(component.items).toEqual(items);
  });

  it('Deberia eliminar datos', () => {
    const id = 1;
    const service = spyOn(component.listadoServicio, 'eliminar').and.returnValue(of(true));

    component.eliminar(id);

    expect(service).toBeTruthy();
  });

  it('Deberia editar datos', () => {
    const id = 1;
    const spyNavigate = spyOn(router, 'navigate');

    component.editar(id);

    expect(spyNavigate).toHaveBeenCalled();
  });
});
