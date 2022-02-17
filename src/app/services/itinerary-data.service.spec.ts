import { TestBed } from '@angular/core/testing';

import { ItineraryDataService } from './itinerary-data.service';

describe('ItineraryDataService', () => {
  let service: ItineraryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItineraryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
