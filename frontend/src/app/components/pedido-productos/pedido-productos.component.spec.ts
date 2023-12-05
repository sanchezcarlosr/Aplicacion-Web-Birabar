import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoProductosComponent } from './pedido-productos.component';

describe('PedidoProductosComponent', () => {
  let component: PedidoProductosComponent;
  let fixture: ComponentFixture<PedidoProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
