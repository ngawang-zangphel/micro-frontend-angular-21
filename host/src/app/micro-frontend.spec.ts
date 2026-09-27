import { TestBed } from '@angular/core/testing';

import { MicroFrontend } from './micro-frontend';

describe('MicroFrontend', () => {
  let service: MicroFrontend;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroFrontend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
