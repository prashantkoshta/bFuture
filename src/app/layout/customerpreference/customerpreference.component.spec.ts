import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PageHeaderModule } from './../../shared';

import { CustomerPreferenceComponent } from './customerpreference.component';

describe('ChartsComponent', () => {
  let component: CustomerPreferenceComponent;
  let fixture: ComponentFixture<CustomerPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      Ng2Charts,
      PageHeaderModule
    ],
      declarations: [ CustomerPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
