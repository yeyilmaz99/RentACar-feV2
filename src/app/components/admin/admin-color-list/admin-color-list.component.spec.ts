import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColorListComponent } from './admin-color-list.component';

describe('AdminColorListComponent', () => {
  let component: AdminColorListComponent;
  let fixture: ComponentFixture<AdminColorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminColorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminColorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
