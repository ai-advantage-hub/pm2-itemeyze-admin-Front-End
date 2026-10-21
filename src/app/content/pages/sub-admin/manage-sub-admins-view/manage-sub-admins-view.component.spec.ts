import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubAdminsViewComponent } from './manage-sub-admins-view.component';

describe('ManageSubAdminsViewComponent', () => {
  let component: ManageSubAdminsViewComponent;
  let fixture: ComponentFixture<ManageSubAdminsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubAdminsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubAdminsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
