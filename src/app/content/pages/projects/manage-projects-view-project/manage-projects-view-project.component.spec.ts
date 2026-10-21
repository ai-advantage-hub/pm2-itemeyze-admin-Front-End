import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsViewProjectComponent } from './manage-projects-view-project.component';

describe('ManageProjectsViewProjectComponent', () => {
  let component: ManageProjectsViewProjectComponent;
  let fixture: ComponentFixture<ManageProjectsViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsViewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
