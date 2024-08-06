import { TestBed } from '@angular/core/testing';

import { DetailsCommandeService } from './details-commande.service';

describe('DetailsCommandeService', () => {
  let service: DetailsCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
