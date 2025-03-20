import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincontactusComponent } from './maincontactus.component';

describe('MaincontactusComponent', () => {
  let component: MaincontactusComponent;
  let fixture: ComponentFixture<MaincontactusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaincontactusComponent]
    });
    fixture = TestBed.createComponent(MaincontactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
