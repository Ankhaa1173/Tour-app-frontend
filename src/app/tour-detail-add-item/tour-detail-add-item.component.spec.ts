import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDetailAddItemComponent } from './tour-detail-add-item.component';

describe('TourDetailAddItemComponent', () => {
  let component: TourDetailAddItemComponent;
  let fixture: ComponentFixture<TourDetailAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourDetailAddItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourDetailAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
