import { TestBed } from '@angular/core/testing';

import { GestorGuardGuard } from './gestor-guard.guard';

describe('GestorGuardGuard', () => {
  let guard: GestorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
