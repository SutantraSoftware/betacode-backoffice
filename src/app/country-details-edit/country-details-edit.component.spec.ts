import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailsEditComponent } from './country-details-edit.component';

describe('CountryDetailsEditComponent', () => {
  let component: CountryDetailsEditComponent;
  let fixture: ComponentFixture<CountryDetailsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryDetailsEditComponent]
    });
    fixture = TestBed.createComponent(CountryDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
