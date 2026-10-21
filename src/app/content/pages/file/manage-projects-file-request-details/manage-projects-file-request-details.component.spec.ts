import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsFileRequestDetailsComponent } from './manage-projects-file-request-details.component';

describe('ManageProjectsFileRequestDetailsComponent', () => {
  let component: ManageProjectsFileRequestDetailsComponent;
  let fixture: ComponentFixture<ManageProjectsFileRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsFileRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsFileRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
