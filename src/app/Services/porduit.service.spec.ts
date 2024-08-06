import { TestBed } from '@angular/core/testing';

import { PorduitService } from './porduit.service';

describe('PorduitService', () => {
  let service: PorduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
