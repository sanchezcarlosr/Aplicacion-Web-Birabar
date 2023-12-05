import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboGestionComponent } from './combo-gestion.component';

describe('ComboGestionComponent', () => {
  let component: ComboGestionComponent;
  let fixture: ComponentFixture<ComboGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
