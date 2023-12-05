import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategoriaProductoComponent } from './gestion-categoria-producto.component';

describe('GestionCategoriaProductoComponent', () => {
  let component: GestionCategoriaProductoComponent;
  let fixture: ComponentFixture<GestionCategoriaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCategoriaProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
