import { Component } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { TourDetailService } from '../../services/tour-detail.service';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { TourDetailItemComponent } from '../tour-detail-item/tour-detail-item.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { TourDetailRateComponent } from '../tour-detail-rate/tour-detail-rate.component';
import { TourDetailAddItemComponent } from '../tour-detail-add-item/tour-detail-add-item.component';

@Component({
  selector: 'tour-detail',
  standalone: true,
  imports: [ReviewCardComponent, TourDetailItemComponent, CommonModule],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss',
})
export class TourDetailComponent {
  tourDetailData: any;
  tourId: number;
  tourData: any = [];
  reviewData: any = [];
  dummyName = 'Gereltuya batsaikhan';
  userLevel: number;
  userData: any;
  constructor(
    private http: HttpService,
    private service: TourDetailService,
    private router: Router,
    private storage: LocalStorageService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.tourId = this.storage.getTourID();
    this.http
      .getTourDetail('tourDetail', this.tourId)
      .subscribe((data: any) => (this.tourDetailData = data));
    this.getAllTours();
    this.getAllReview();
    this.checkUser();
  }
  getAllTours() {
    this.http
      .getTourItems({ tourId: this.tourId })
      .subscribe((res) => (this.tourData = res));
    // this.http.getData('tourList').subscribe((resultData: any) => {
    //   console.log(resultData);
    //   this.tourData = resultData;
    // });
  }
  getAllReview() {
    this.http
      .getTourReviews({ tourId: this.tourId })
      .subscribe((res) => (this.reviewData = res));
  }

  rate() {
    if (localStorage.getItem('jwt')) {
      this.service.tourIdForRate = this.tourId;
      let dialogRef = this.dialog.open(TourDetailRateComponent, {
        height: '400px',
        width: '600px',
        panelClass: 'custom-dialog-bg',
      });
      dialogRef.afterClosed().subscribe((result) => this.getAllReview());
    } else {
      this.router.navigate(['login']);
    }
    // this.router.navigate(['/tour-detail-rate']);
  }
  addTour() {
    if (localStorage.getItem('jwt') && this.userLevel < 1) {
      this.service.passedData = this.tourId;
      // this.router.navigate(['/tour-detail-add-item']);
      let dialogRef = this.dialog.open(TourDetailAddItemComponent, {
        height: '400px',
        width: '600px',
        panelClass: 'custom-dialog-bg',
      });
      dialogRef.afterClosed().subscribe((result) => this.getAllTours());
    }
  }
  checkUser() {
    this.http.checkUser().subscribe({
      next: (res: any) => {
        Emitters.authEmitter.emit(true);
        this.userLevel = res['user_level'];
        this.userData = res;
        this.userData['company'] = 1;
      },
      error: (err) => {
        Emitters.authEmitter.emit(false);
        this.storage.logout();
      },
    });
  }
}
