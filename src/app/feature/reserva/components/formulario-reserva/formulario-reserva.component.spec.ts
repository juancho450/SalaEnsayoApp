import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservaComponent } from './formulario-reserva.component';

describe('FormularioReservaComponent', () => {
  let component: FormularioReservaComponent;
  let fixture: ComponentFixture<FormularioReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
