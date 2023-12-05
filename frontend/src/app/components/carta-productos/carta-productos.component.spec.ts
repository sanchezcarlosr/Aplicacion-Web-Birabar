import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaProductosComponent } from './carta-productos.component';

describe('CartaProductosComponent', () => {
  let component: CartaProductosComponent;
  let fixture: ComponentFixture<CartaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
