import { TestBed } from '@angular/core/testing';

import { AccidentsService } from './accidents.service';

describe('AccidentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccidentsService = TestBed.get(AccidentsService);
    expect(service).toBeTruthy();
  });
});
