import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourItemCardComponent } from './tour-item-card.component';

describe('TourItemCardComponent', () => {
  let component: TourItemCardComponent;
  let fixture: ComponentFixture<TourItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
