import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersRequestComponent } from './manage-users-request.component';

describe('ManageUsersRequestComponent', () => {
  let component: ManageUsersRequestComponent;
  let fixture: ComponentFixture<ManageUsersRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsersRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
