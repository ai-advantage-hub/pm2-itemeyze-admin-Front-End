import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubAdminsComponent } from './manage-sub-admins.component';

describe('ManageSubAdminsComponent', () => {
  let component: ManageSubAdminsComponent;
  let fixture: ComponentFixture<ManageSubAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSubAdminsComponent]
    });
    fixture = TestBed.createComponent(ManageSubAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
