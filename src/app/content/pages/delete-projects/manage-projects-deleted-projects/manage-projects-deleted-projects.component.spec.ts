import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsDeletedProjectsComponent } from './manage-projects-deleted-projects.component';

describe('ManageProjectsDeletedProjectsComponent', () => {
  let component: ManageProjectsDeletedProjectsComponent;
  let fixture: ComponentFixture<ManageProjectsDeletedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsDeletedProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsDeletedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
