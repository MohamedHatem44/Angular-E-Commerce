import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesDashboardComponent } from './admin-categories-dashboard.component';

describe('AdminCategoriesDashboardComponent', () => {
  let component: AdminCategoriesDashboardComponent;
  let fixture: ComponentFixture<AdminCategoriesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoriesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
