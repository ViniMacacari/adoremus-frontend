import { TestBed } from '@angular/core/testing';

import { LocalRequestService } from './local-request.service';

describe('LocalRequestService', () => {
  let service: LocalRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
