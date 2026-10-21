import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsFileRequestComponent } from './manage-projects-file-request.component';

describe('ManageProjectsFileRequestComponent', () => {
  let component: ManageProjectsFileRequestComponent;
  let fixture: ComponentFixture<ManageProjectsFileRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsFileRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsFileRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
