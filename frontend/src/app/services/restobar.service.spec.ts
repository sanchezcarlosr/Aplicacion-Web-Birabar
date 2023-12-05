import { TestBed } from '@angular/core/testing';

import { RestobarService } from './restobar.service';

describe('RestobarService', () => {
  let service: RestobarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestobarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
