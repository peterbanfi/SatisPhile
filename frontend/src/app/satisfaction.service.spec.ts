import { TestBed, inject } from '@angular/core/testing';

import { SatisfactionService } from './satisfaction.service';

describe('SatisfactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SatisfactionService]
    });
  });

  it('should be created', inject([SatisfactionService], (service: SatisfactionService) => {
    expect(service).toBeTruthy();
  }));
});
