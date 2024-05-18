import { Component, Input, OnInit } from '@angular/core';
import { TourDetailService } from '../../services/tour-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tour-detail-item',
  standalone: true,
  imports: [],
  templateUrl: './tour-detail-item.component.html',
  styleUrl: './tour-detail-item.component.scss',
})
export class TourDetailItemComponent implements OnInit {
  @Input() tourName: string;
  @Input() tourLevel: number;
  @Input() tourPrice: number;
  @Input() tourId: number;
  @Input() imgPath: string;
  constructor(
    private detailService: TourDetailService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (!this.imgPath) {
      this.imgPath = '../../assets/testImage.png';
    } else {
      this.imgPath = 'http://127.0.0.1:8000/' + this.imgPath;
    }
  }
  handleClick() {
    this.detailService.passedData = this.tourId;

    this.router.navigate(['/tour-detail']);
    console.log('its been clicked');
  }
  getImage() {
    return '/Tour-app/storage/image6.png';
  }
}
