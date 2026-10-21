import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsMarkDeletionComponent } from './manage-projects-mark-deletion.component';

describe('ManageProjectsMarkDeletionComponent', () => {
  let component: ManageProjectsMarkDeletionComponent;
  let fixture: ComponentFixture<ManageProjectsMarkDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsMarkDeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsMarkDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
