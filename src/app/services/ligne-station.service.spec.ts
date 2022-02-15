import { TestBed } from '@angular/core/testing';

import { LigneStationService } from './ligne-station.service';

describe('LigneStationService', () => {
  let service: LigneStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
