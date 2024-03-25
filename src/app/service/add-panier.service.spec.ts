import { TestBed } from '@angular/core/testing';

import { AddPanierService } from './add-panier.service';

describe('AddPanierService', () => {
  let service: AddPanierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPanierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
