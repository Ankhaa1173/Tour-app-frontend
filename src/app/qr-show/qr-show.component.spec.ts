import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrShowComponent } from './qr-show.component';

describe('QrShowComponent', () => {
  let component: QrShowComponent;
  let fixture: ComponentFixture<QrShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
