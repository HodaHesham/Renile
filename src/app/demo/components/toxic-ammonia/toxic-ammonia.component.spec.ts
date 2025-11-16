import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicAmmoniaComponent } from './toxic-ammonia.component';

describe('ToxicAmmoniaComponent', () => {
  let component: ToxicAmmoniaComponent;
  let fixture: ComponentFixture<ToxicAmmoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToxicAmmoniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToxicAmmoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
