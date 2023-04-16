import { TestBed } from '@angular/core/testing';

import { RestSearchService } from './rest-search.service';

describe('RestSearchService', () => {
  let service: RestSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
