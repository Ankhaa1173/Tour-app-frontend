import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rating-star',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './rating-star.component.html',
  styleUrl: './rating-star.component.scss',
})
export class RatingStarComponent {
  faStar = faStar;
  rating: number = 0;
  @Output() ratingStarEvent = new EventEmitter<number>();
  constructor() {}

  setRating(value: number) {
    if (this.rating == value) {
      this.rating = value - 1;
    } else {
      this.rating = value;
    }
    this.ratingStarEvent.emit(this.rating);
  }
}
