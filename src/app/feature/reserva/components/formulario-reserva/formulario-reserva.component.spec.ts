import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '../../shared/service/reserva.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormularioReservaComponent } from './formulario-reserva.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormularioReservaComponent', () => {
  let component: FormularioReservaComponent;
  let fixture: ComponentFixture<FormularioReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgbModule, NgSelectModule, ReactiveFormsModule],
      declarations: [ FormularioReservaComponent ],
      providers: [
        ReservaService,
        HttpService
      ]
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

  it('should create a FormGroup', () => {
    expect(component.formularioReserva instanceof FormGroup).toBe(true);
  });

  it('should be the form invalid when it is empty', () => {
    expect(component.formularioReserva.valid).toBeFalsy();
  });

  it('should enable the save button when the form is valid', () => {
    component.formularioReserva.controls.nombre.setValue('Banda 1');
    component.formularioReserva.controls.fecha.setValue({year: 2021, month: 3, day: 30});
    component.formularioReserva.controls.hora_inicial.setValue(8);
    component.formularioReserva.controls.hora_final.setValue(10);

    expect(component.formularioReserva.valid).toBeTruthy();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should save the reservation', () => {
    expect(component.formularioReserva.valid).toBeFalsy();
    component.formularioReserva.controls.nombre.setValue('Banda 1');
    component.formularioReserva.controls.fecha.setValue({year: 2021, month: 3, day: 30});
    component.formularioReserva.controls.hora_inicial.setValue(8);
    component.formularioReserva.controls.hora_final.setValue(10);
    expect(component.formularioReserva.valid).toBeTruthy();

    component.guardar();
  });
});
