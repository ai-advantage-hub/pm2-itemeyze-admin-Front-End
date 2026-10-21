import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectDeletedFileEditDetailsComponent } from './manage-project-deleted-file-edit-details.component';

describe('ManageProjectDeletedFileEditDetailsComponent', () => {
  let component: ManageProjectDeletedFileEditDetailsComponent;
  let fixture: ComponentFixture<ManageProjectDeletedFileEditDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectDeletedFileEditDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectDeletedFileEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
