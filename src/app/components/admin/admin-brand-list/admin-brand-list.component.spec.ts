import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandListComponent } from './admin-brand-list.component';

describe('AdminBrandListComponent', () => {
  let component: AdminBrandListComponent;
  let fixture: ComponentFixture<AdminBrandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBrandListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
