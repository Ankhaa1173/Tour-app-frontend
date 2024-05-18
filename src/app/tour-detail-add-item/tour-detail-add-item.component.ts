import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TourDetailService } from '../../services/tour-detail.service';
import { HttpService } from '../../services/http-service.service';
import { Emitters } from '../emitters/emitters';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'tour-detail-add-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tour-detail-add-item.component.html',
  styleUrl: './tour-detail-add-item.component.scss',
})
export class TourDetailAddItemComponent implements OnInit {
  constructor(
    private service: TourDetailService,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private storageService: LocalStorageService
  ) {}
  tourId: number;
  userData: any;
  form: FormGroup;
  img: File;
  ngOnInit(): void {
    this.checkUser();
    this.tourId = this.service.passedData;
    this.form = this.formBuilder.group({
      name: '',
      img_path: '',
      duration: 0,
      price: 0,
      level: 0,
      description: '',
      tour_id: this.tourId,
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
        this.storageService.logout();
      },
    });
  }
  getData() {}

  submit() {
    const formData: FormData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      formData.append(key, control?.value);
    });
    formData.append('img_path', this.img, this.img.name);
    this.http
      .insertTourItem(formData)
      .subscribe((res: any) => alert(res['status']));
  }
  onImageChanged(event: any) {
    this.img = event.target.files[0];
  }
}
