import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContactComponent } from './dashboard-contact.component';

describe('DashboardContactComponent', () => {
  let component: DashboardContactComponent;
  let fixture: ComponentFixture<DashboardContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardContactComponent]
    });
    fixture = TestBed.createComponent(DashboardContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
