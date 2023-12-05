import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCalificacionComponent } from './pedido-calificacion.component';

describe('PedidoCalificacionComponent', () => {
  let component: PedidoCalificacionComponent;
  let fixture: ComponentFixture<PedidoCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
