import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private filterStorageName: string = 'filter';
  private tourIdStorageName: string = 'tourId';
  constructor() {}

  setFilters(data: any) {
    localStorage.setItem(this.filterStorageName, JSON.stringify(data));
  }

  getFilters() {
    let data = localStorage.getItem(this.filterStorageName);
    if (data == null) {
      data = '';
    }
    return JSON.parse(data);
  }

  cleanFilter() {
    localStorage.removeItem(this.filterStorageName);
  }

  setTourID(data: any) {
    localStorage.setItem(this.tourIdStorageName, JSON.stringify(data));
  }

  getTourID() {
    let data = localStorage.getItem(this.tourIdStorageName);
    if (data == null) {
      data = '';
    }
    return JSON.parse(data);
  }

  cleanTourID() {
    localStorage.removeItem(this.tourIdStorageName);
  }

  cleanAll() {
    localStorage.clear();
  }
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('tourBasket');
  }
}
