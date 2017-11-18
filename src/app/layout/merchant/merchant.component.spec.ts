import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { MerchantComponent } from './merchant.component';

describe('DashboardComponent', () => {
  let component: MerchantComponent;
  let fixture: ComponentFixture<MerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        StatModule,
    ],
      declarations: [
        MerchantComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
