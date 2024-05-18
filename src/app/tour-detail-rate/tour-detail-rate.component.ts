import { Component, OnInit } from '@angular/core';
import { TourDetailService } from '../../services/tour-detail.service';
import { HttpService } from '../../services/http-service.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Emitters } from '../emitters/emitters';
import { LocalStorageService } from '../../services/local-storage.service';
import { RatingStarComponent } from '../rating-star/rating-star.component';

@Component({
  selector: 'tour-detail-rate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RatingStarComponent],
  templateUrl: './tour-detail-rate.component.html',
  styleUrl: './tour-detail-rate.component.scss',
})
export class TourDetailRateComponent implements OnInit {
  constructor(
    private service: TourDetailService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private storage: LocalStorageService
  ) {}
  form: FormGroup;
  tourId: any;
  userData: any;
  rating: number;
  ngOnInit(): void {
    this.checkUser();
    this.tourId = this.storage.getTourID();
    this.form = this.formBuilder.group({
      reveiw: '',
      rating: 0,
    });
  }
  checkUser() {
    this.http.checkUser().subscribe({
      next: (res: any) => {
        Emitters.authEmitter.emit(true);
        this.userData = res;
      },
      error: (err) => {
        Emitters.authEmitter.emit(false);
        this.storage.logout();
      },
    });
  }
  getData() {}
  submit() {
    let data = this.form.getRawValue();
    data['rating'] = this.rating;
    data['tour_id'] = this.tourId;
    data['user_id'] = this.userData['id'];
    this.http.insertRating(data).subscribe({
      next: (res) => alert('success'),
      error: (err) => alert(err),
    });
  }
  getRating(ratingChild: number) {
    this.rating = ratingChild;
  }
}
