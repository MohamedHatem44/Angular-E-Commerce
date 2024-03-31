import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandsDashboardComponent } from './admin-brands-dashboard.component';

describe('AdminBrandsDashboardComponent', () => {
  let component: AdminBrandsDashboardComponent;
  let fixture: ComponentFixture<AdminBrandsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBrandsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBrandsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
