import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsProjectRequestComponent } from './manage-projects-project-request.component';

describe('ManageProjectsProjectRequestComponent', () => {
  let component: ManageProjectsProjectRequestComponent;
  let fixture: ComponentFixture<ManageProjectsProjectRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsProjectRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsProjectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
