import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsDeletedFilesComponent } from './manage-projects-deleted-files.component';

describe('ManageProjectsDeletedFilesComponent', () => {
  let component: ManageProjectsDeletedFilesComponent;
  let fixture: ComponentFixture<ManageProjectsDeletedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsDeletedFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsDeletedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
