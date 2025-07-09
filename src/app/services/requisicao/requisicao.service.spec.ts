import { TestBed } from '@angular/core/testing';

import { RequestService } from './requisicao.service';

describe('RequisicaoService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
