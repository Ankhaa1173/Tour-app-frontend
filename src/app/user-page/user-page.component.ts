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
import { OrderlistComponent } from '../orderlist/orderlist.component';

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
    OrderlistComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  pageId: number = 1;
  tourData: any = [];
  userLevel: number;
  userData: any;
  companyData: any;

  form: FormGroup;
  userForm: FormGroup;
  companyForm: FormGroup;
  operatorForm: FormGroup;
  constantForm: FormGroup;

  img: File;
  savedPlaceList: number[];
  reviewList: any = [];
  orderList: any = [];
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
      name: null,
      duration: null,
      company: null,
      price: null,
      level: null,
      description: null,
      district: null,
      province: null,
      main_img_path: null,
      recommended_people_no: null,
      type: null,
      tag1: null,
      tag2: null,
      tag3: null,
    });
    this.userForm = this.formBuilder.group({
      id: 0,
      first_name: null,
      last_name: null,
      email: null,
      phone_no: null,
      password: null,
      password_re: null,
    });
    this.companyForm = this.formBuilder.group({
      name: '',
      website: '',
      bankaccountno: '',
    });
    this.operatorForm = this.formBuilder.group({
      id: '',
      company_id: '',
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
        if (this.userLevel == 2) {
          this.http.getOperator({ id: this.userData['id'] }).subscribe({
            next: (res: any) => {
              this.userData['company'] = res['company_id'];
              this.http.detailCompany({ id: res['company_id'] }).subscribe({
                next: (res: any) => {
                  this.companyData = res;
                  this.companyForm.controls['name'].setValue(
                    this.companyData['name']
                  );
                  this.companyForm.controls['website'].setValue(
                    this.companyData['website']
                  );
                  this.companyForm.controls['bankaccountno'].setValue(
                    this.companyData['bankaccountno']
                  );
                },
                error: (err: any) => {
                  alert(err.error.detail);
                },
              });
            },
            error: (err: any) => {
              alert(err.error.detail);
            },
          });
        }
        this.getReviews();
        this.getOrders();
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
  }
  getReviews() {
    this.http.getTourReviews({ userId: this.userData['id'] }).subscribe({
      next: (res: any) => {
        this.reviewList = res;
      },
      error: (err: any) => {
        alert(err);
      },
    });
  }
  getOrders() {
    this.http.getOrdersForUser({ user_id: this.userData['id'] }).subscribe({
      next: (res: any) => {
        this.orderList = res;
      },
      error: (err: any) => {
        alert(err);
      },
    });
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
    if (data['password'] != data['password_re']) {
      alert('Password not match!');
      return;
    }
    data['id'] = this.userData['id'];
    this.http.updateUser(data).subscribe((res: any) => {
      alert(res['status']);
      this.checkUser();
    });
  }
  insertCompany() {
    let data = this.companyForm.getRawValue();
    this.http.insertCompany(data).subscribe((res: any) => {
      alert(res['status']);
    });
  }
  updateCompany() {
    let data = this.companyForm.getRawValue();
    this.http.insertCompany(data).subscribe((res: any) => {
      alert(res['status']);
    });
  }
  insertOperator() {
    let data = this.operatorForm.getRawValue();
    this.http.insertOperator(data).subscribe((res: any) => {
      alert(res['status']);
    });
  }
  onImageChanged(event: any) {
    this.img = event.target.files[0];
  }
}
