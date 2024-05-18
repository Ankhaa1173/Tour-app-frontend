import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDetailRateComponent } from './tour-detail-rate.component';

describe('TourDetailRateComponent', () => {
  let component: TourDetailRateComponent;
  let fixture: ComponentFixture<TourDetailRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourDetailRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourDetailRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
