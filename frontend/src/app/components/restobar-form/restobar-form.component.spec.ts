import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestobarFormComponent } from './restobar-form.component';

describe('RestobarFormComponent', () => {
  let component: RestobarFormComponent;
  let fixture: ComponentFixture<RestobarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestobarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestobarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
