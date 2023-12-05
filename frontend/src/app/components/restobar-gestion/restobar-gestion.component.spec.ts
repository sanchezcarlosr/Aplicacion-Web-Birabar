import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestobarGestionComponent } from './restobar-gestion.component';

describe('RestobarGestionComponent', () => {
  let component: RestobarGestionComponent;
  let fixture: ComponentFixture<RestobarGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestobarGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestobarGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
