import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManufacturersComponent } from './manage-manufacturers.component';

describe('ManageManufacturersComponent', () => {
  let component: ManageManufacturersComponent;
  let fixture: ComponentFixture<ManageManufacturersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageManufacturersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
