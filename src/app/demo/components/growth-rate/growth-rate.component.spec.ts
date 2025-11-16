import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthRateComponent } from './growth-rate.component';

describe('GrowthRateComponent', () => {
  let component: GrowthRateComponent;
  let fixture: ComponentFixture<GrowthRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowthRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrowthRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
