import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { TourItemCardComponent } from '../tour-item-card/tour-item-card.component';
import { HttpService } from '../../services/http-service.service';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { Emitters } from '../emitters/emitters';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TourListComponent } from '../tour-list/tour-list.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { routes } from '../app.routes';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    TourItemCardComponent,
    ReviewCardComponent,
    FormsModule,
    ReactiveFormsModule,
    TourListComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  pageId: number = 1;
  tourData: any = [];
  userLevel: number;
  userData: any;
  form: FormGroup;
  userForm: FormGroup;
  img: File;
  savedPlaceList: number[];
  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private storageService: LocalStorageService,
    private locationService: Location
  ) {}

  ngOnInit() {
    // this.router.events
    //   .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
    //   .subscribe((RouterEvent: NavigationEnd) => {

    //   });
    let toursRaw = localStorage.getItem('tourBasket');
    this.savedPlaceList = JSON.parse(toursRaw == null ? '[]' : toursRaw);
    this.form = this.formBuilder.group({
      name: '',
      duration: 0,
      company: '',
      price: 0,
      level: 0,
      description: '',
      district: '',
      province: '',
      main_img_path: '',
    });
    this.userForm = this.formBuilder.group({
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
    });
    this.checkUser();
    this.getAllTours();
  }

  getAllTours() {
    this.http.getData('tourList').subscribe((resultData: any) => {
      console.log(resultData);
      this.tourData = resultData;
    });
  }
  checkUser() {
    this.http.checkUser().subscribe({
      next: (res: any) => {
        Emitters.authEmitter.emit(true);
        this.userLevel = res['user_level'];
        this.userData = res;
        this.userData['company'] = 1;
        this.pageId = 2;
      },
      error: (err) => {
        Emitters.authEmitter.emit(false);
        this.storageService.logout();
        this.locationService.back();
      },
    });
  }
  changePage(value: number) {
    this.pageId = value;
    if (value == 5) {
      this.getAllTours();
    }
  }
  insertForm() {
    let data = this.form.getRawValue();
    data['company'] = this.userData['company'];
    const formData: FormData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      formData.append(key, control?.value);
    });
    formData.append('main_img_path', this.img, this.img.name);
    formData.append('company', this.userData['company']);
    this.http
      .insertTour(formData)
      .subscribe((res: any) => alert(res['status']));
  }
  updateUser() {
    let data = this.userForm.getRawValue();
    data['id'] = this.userData['id'];
    this.http.updateUser(data).subscribe((res: any) => {
      alert(res['status']);
      this.checkUser();
    });
  }
  onImageChanged(event: any) {
    this.img = event.target.files[0];
  }
}
