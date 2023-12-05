import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoGestionComponent } from './pedido-gestion.component';

describe('PedidoGestionComponent', () => {
  let component: PedidoGestionComponent;
  let fixture: ComponentFixture<PedidoGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
