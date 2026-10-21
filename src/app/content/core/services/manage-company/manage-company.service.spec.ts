import { TestBed } from '@angular/core/testing';

import { ManageCompanyService } from './manage-company.service';

describe('ManageCompanyService', () => {
  let service: ManageCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
