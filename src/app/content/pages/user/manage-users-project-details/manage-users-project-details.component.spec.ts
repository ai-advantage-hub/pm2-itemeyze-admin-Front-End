import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersProjectDetailsComponent } from './manage-users-project-details.component';

describe('ManageUsersProjectDetailsComponent', () => {
  let component: ManageUsersProjectDetailsComponent;
  let fixture: ComponentFixture<ManageUsersProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsersProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
