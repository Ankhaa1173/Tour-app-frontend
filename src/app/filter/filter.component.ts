import { Component } from '@angular/core';
import { RatingStarComponent } from '../rating-star/rating-star.component';
import { LocalStorageService } from '../../services/local-storage.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpService } from '../../services/http-service.service';
import { Emitters } from '../emitters/emitters';
import { TourListService } from '../../services/tour-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [RatingStarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  form: FormGroup;
  rating = 0;

  constructor(
    private listService: TourListService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      price: null,
      type: null,
      personNo: null,
      personMax: null,
      personMin: null,
      priceMax: null,
      priceMin: null,
    });
  }
  submit() {
    const data = this.form.getRawValue();
    data['rating'] = this.rating;
    console.log(data);

    this.listService.passedData = data;
    this.router.navigate(['/tour-list']);
  }
  getRating(ratingChild: number) {
    this.rating = ratingChild;
  }
  changePersonNo(pNo: number) {
    switch (pNo) {
      case 1:
        this.setFormValue('personMax', 2);
        this.setFormValue('personMin', 1);
        break;
      case 2:
        this.setFormValue('personMax', 8);
        this.setFormValue('personMin', 2);
        break;
      case 3:
        this.setFormValue('personMin', 8);
        break;
      default:
        break;
    }
  }
  changePrice(priceIndex: number) {
    switch (priceIndex) {
      case 1:
        this.setFormValue('priceMax', 30000);
        this.setFormValue('priceMin', null);
        break;
      case 2:
        this.setFormValue('priceMax', 70000);
        this.setFormValue('priceMin', 30000);
        break;
      case 3:
        this.setFormValue('priceMin', 70000);
        this.setFormValue('priceMax', null);
        break;
      default:
        break;
    }
  }

  setFormValue(controlName: string, value: any) {
    this.form.controls[controlName].setValue(value);
  }
  resetForm() {
    this.form.reset();
  }
}
