
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { CustomerComponent } from './customer.component';

describe('DashboardComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        StatModule,
    ],
      declarations: [
        CustomerComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
