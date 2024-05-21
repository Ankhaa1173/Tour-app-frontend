import { Component, Input, OnInit } from '@angular/core';
import { TourDetailService } from '../../services/tour-detail.service';

@Component({
  selector: 'app-qr-show',
  standalone: true,
  imports: [],
  templateUrl: './qr-show.component.html',
  styleUrl: './qr-show.component.scss',
})
export class QrShowComponent implements OnInit {
  qrCodeUrl: any;
  constructor(private serveice: TourDetailService) {}
  ngOnInit() {
    this.qrCodeUrl = this.serveice.qrCode;
  }
}
