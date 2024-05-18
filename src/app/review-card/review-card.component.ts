import { Component, Input } from '@angular/core';

@Component({
  selector: 'review-card',
  standalone: true,
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input() userId: number;
  @Input() userName: String;
  @Input() userReviewNo: number;
  @Input() tourId: number;
  @Input() rating: number;
  @Input() review: String;
}
