import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsAddProjectComponent } from './manage-projects-add-project.component';

describe('ManageProjectsAddProjectComponent', () => {
  let component: ManageProjectsAddProjectComponent;
  let fixture: ComponentFixture<ManageProjectsAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsAddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
