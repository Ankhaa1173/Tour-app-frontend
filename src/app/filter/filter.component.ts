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

@Component({
  selector: 'filter',
  standalone: true,
  imports: [RatingStarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  form: FormGroup;
  constructor(
    private storage: LocalStorageService,
    private formBuilder: FormBuilder,
    private http: HttpService
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
  }
  submit() {
    this.http.loginUser(this.form.getRawValue()).subscribe((res: any) => {});
  }
}
