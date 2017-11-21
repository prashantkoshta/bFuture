import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PageHeaderModule } from './../../shared';

import { CustomerContentComponent } from './customercontent.component';

describe('ChartsComponent', () => {
  let component: CustomerContentComponent;
  let fixture: ComponentFixture<CustomerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      Ng2Charts,
      PageHeaderModule
    ],
      declarations: [ CustomerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
