import { TestBed } from '@angular/core/testing';

import { ManageProjectsService } from './manage-projects.service';

describe('ManageProjectsService', () => {
  let service: ManageProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
