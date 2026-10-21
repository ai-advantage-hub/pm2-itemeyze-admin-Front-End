import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsFileBinComponent } from './manage-projects-file-bin.component';

describe('ManageProjectsFileBinComponent', () => {
  let component: ManageProjectsFileBinComponent;
  let fixture: ComponentFixture<ManageProjectsFileBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsFileBinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsFileBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
