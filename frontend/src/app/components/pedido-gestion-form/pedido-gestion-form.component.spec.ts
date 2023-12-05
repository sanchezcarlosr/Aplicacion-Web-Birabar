import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoGestionFormComponent } from './pedido-gestion-form.component';

describe('PedidoGestionFormComponent', () => {
  let component: PedidoGestionFormComponent;
  let fixture: ComponentFixture<PedidoGestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoGestionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoGestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
