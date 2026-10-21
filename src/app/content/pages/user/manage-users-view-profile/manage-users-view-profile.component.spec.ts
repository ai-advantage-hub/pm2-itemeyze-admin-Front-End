import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersViewProfileComponent } from './manage-users-view-profile.component';

describe('ManageUsersViewProfileComponent', () => {
  let component: ManageUsersViewProfileComponent;
  let fixture: ComponentFixture<ManageUsersViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsersViewProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
