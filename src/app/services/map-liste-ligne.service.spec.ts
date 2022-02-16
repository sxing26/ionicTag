import { TestBed } from '@angular/core/testing';

import { MapListeLigneService } from './map-liste-ligne.service';

describe('MapListeLigneService', () => {
  let service: MapListeLigneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapListeLigneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
