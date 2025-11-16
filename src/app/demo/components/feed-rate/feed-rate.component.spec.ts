import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedRateComponent } from './feed-rate.component';

describe('FeedRateComponent', () => {
  let component: FeedRateComponent;
  let fixture: ComponentFixture<FeedRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
