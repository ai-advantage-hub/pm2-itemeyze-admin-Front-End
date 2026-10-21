import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectsAddFileComponent } from './manage-projects-add-file.component';

describe('ManageProjectsAddFileComponent', () => {
  let component: ManageProjectsAddFileComponent;
  let fixture: ComponentFixture<ManageProjectsAddFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectsAddFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectsAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
