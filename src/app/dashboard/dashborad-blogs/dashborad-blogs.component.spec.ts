import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradBlogsComponent } from './dashborad-blogs.component';

describe('DashboradBlogsComponent', () => {
  let component: DashboradBlogsComponent;
  let fixture: ComponentFixture<DashboradBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboradBlogsComponent]
    });
    fixture = TestBed.createComponent(DashboradBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
