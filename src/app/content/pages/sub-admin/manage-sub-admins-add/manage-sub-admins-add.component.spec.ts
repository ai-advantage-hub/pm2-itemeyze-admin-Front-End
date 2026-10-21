import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubAdminsAddComponent } from './manage-sub-admins-add.component';

describe('ManageSubAdminsAddComponent', () => {
  let component: ManageSubAdminsAddComponent;
  let fixture: ComponentFixture<ManageSubAdminsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubAdminsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubAdminsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
