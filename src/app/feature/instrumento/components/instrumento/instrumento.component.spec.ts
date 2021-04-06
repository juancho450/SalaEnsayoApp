import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { InstrumentoService } from '../../shared/service/instrumento.service';

import { InstrumentoComponent } from './instrumento.component';

describe('InstrumentoComponent', () => {
  let component: InstrumentoComponent;
  let fixture: ComponentFixture<InstrumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentoComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        InstrumentoService,
        HttpService,
        DatePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
