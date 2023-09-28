import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioServicioComponent } from './formulario-servicio.component';

describe('FormularioServicioComponent', () => {
  let component: FormularioServicioComponent;
  let fixture: ComponentFixture<FormularioServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioServicioComponent]
    });
    fixture = TestBed.createComponent(FormularioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
