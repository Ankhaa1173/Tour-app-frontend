import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = 'http://127.0.0.1:8000/';
  // private url = 'http://10.3.131.216:8000/';

  constructor(private http: HttpClient) {}

  getData(urlDetail: string) {
    return this.http.get(this.url + 'tour/' + urlDetail);
  }
  getTourDetail(urlDetail: string, tourId: number) {
    return this.http.post(this.url + 'tour/' + urlDetail, { id: tourId });
  }
  getTourList(urlDetail: string, filterData: any) {
    return this.http.post<any>(this.url + 'tour/' + urlDetail, filterData);
  }
  insertTour(data: any) {
    return this.http.post(this.url + '/tour/insert', data);
  }
  updateTour(data: any) {
    return this.http.post(this.url + '/tour/update', data);
  }
  deleteTour(data: any) {
    return this.http.post(this.url + '/tour/delete', data);
  }

  registerUser(data: any) {
    return this.http.post(this.url + 'user/register', data);
  }
  loginUser(data: any) {
    return this.http.post(this.url + 'user/login', data, {
      withCredentials: true,
    });
  }
  checkUser() {
    let jwt = localStorage.getItem('jwt');
    return this.http.post(this.url + 'user/user', { jwt: jwt });
  }
  logout() {
    localStorage.removeItem('jwt');
    return this.http.post(this.url + 'user/logout', {});
  }

  updateUser(data: any) {
    return this.http.post(this.url + 'user/update', data);
  }

  getTourItems(data: any) {
    return this.http.post(this.url + 'tour/tourItemList', data);
  }
  getTourReviewDetail(data: any) {
    return this.http.post(this.url + 'tour/tourReviewDetail', data);
  }

  getTourReviews(data: any) {
    return this.http.post(this.url + 'tour/tourReviewList', data);
  }

  insertRating(data: any) {
    return this.http.post(this.url + 'tour/tourReviewInsert', data);
  }

  insertTourItem(data: any) {
    return this.http.post(this.url + 'tour/tourItemInsert', data);
  }

  insertCompany(data: any) {
    return this.http.post(this.url + 'user/companyListInsert', data);
  }

  updateCompany(data: any) {
    return this.http.post(this.url + 'user/companyListUpdate', data);
  }

  detailCompany(data: any) {
    return this.http.post(this.url + 'user/companyListDetail', data);
  }

  insertSavedPlaces(data: any) {
    return this.http.post(this.url + 'tour/savedPlaceListInsert', data);
  }
  insertOperator(data: any) {
    return this.http.post(this.url + 'user/operatorListInsert', data);
  }
  getOperator(data: any) {
    return this.http.post(this.url + 'user/operatorListDetail', data);
  }
  insertOrder(data: any) {
    return this.http.post(this.url + 'tour/orderListInsert', data, {
      responseType: 'blob',
    });
  }
  getOrdersForUser(data: any) {
    return this.http.post(this.url + 'tour/orderList', data);
  }
}
