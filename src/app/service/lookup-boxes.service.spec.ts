import { TestBed } from '@angular/core/testing';

import { LookupBoxesService } from './lookup-boxes.service';

describe('LookupBoxesService', () => {
  let service: LookupBoxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupBoxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
