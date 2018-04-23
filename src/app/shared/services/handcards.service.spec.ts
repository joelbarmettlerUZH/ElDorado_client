import { TestBed, inject } from '@angular/core/testing';

import { HandcardsService } from './handcards.service';

describe('HandcardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandcardsService]
    });
  });

  it('should be created', inject([HandcardsService], (service: HandcardsService) => {
    expect(service).toBeTruthy();
  }));
});
