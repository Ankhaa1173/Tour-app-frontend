import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDetailItemComponent } from './tour-detail-item.component';

describe('TourDetailItemComponent', () => {
  let component: TourDetailItemComponent;
  let fixture: ComponentFixture<TourDetailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourDetailItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
