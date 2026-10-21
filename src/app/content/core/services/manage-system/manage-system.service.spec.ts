import { TestBed } from '@angular/core/testing';

import { ManageSystemService } from './manage-system.service';

describe('ManageSystemService', () => {
  let service: ManageSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
