import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCartaComponent } from './gestion-carta.component';

describe('GestionCartaComponent', () => {
  let component: GestionCartaComponent;
  let fixture: ComponentFixture<GestionCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCartaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
