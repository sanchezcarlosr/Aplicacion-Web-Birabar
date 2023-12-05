import { TestBed } from '@angular/core/testing';

import { ClientGuardGuard } from './client-guard.guard';

describe('ClientGuardGuard', () => {
  let guard: ClientGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
