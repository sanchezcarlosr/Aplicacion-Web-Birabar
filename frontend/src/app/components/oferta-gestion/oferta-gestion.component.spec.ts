import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaGestionComponent } from './oferta-gestion.component';

describe('OfertaGestionComponent', () => {
  let component: OfertaGestionComponent;
  let fixture: ComponentFixture<OfertaGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
