import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioGestionComponent } from './usuario-gestion.component';

describe('UsuarioGestionComponent', () => {
  let component: UsuarioGestionComponent;
  let fixture: ComponentFixture<UsuarioGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
