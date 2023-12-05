import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionWhatsAppComponent } from './gestion-whats-app.component';

describe('GestionWhatsAppComponent', () => {
  let component: GestionWhatsAppComponent;
  let fixture: ComponentFixture<GestionWhatsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionWhatsAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionWhatsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
