import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { OffersComponent } from './offers.component';

describe('ProGroupComponent', () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        StatModule,
    ],
      declarations: [
        OffersComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
