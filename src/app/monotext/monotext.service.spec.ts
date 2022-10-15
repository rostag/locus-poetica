import { TestBed } from '@angular/core/testing';

import { MonotextService } from './monotext.service';

describe('MonotextService', () => {
  let service: MonotextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonotextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
