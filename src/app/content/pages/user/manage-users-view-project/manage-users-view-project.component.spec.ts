import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersViewProjectComponent } from './manage-users-view-project.component';

describe('ManageUsersViewProjectComponent', () => {
  let component: ManageUsersViewProjectComponent;
  let fixture: ComponentFixture<ManageUsersViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsersViewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
