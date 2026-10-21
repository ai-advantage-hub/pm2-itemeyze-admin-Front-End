import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubAdminsEditComponent } from './manage-sub-admins-edit.component';

describe('ManageSubAdminsEditComponent', () => {
  let component: ManageSubAdminsEditComponent;
  let fixture: ComponentFixture<ManageSubAdminsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubAdminsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubAdminsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
