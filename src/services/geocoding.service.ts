// geocoding.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiUrl = 'https://api.opencagedata.com/geocode/v1/json';
  private apiKey = 'ea6790c069894538860ada034b099183'; // Replace with your OpenCage API key

  constructor(private http: HttpClient) {}

  reverseGeocode(lat: number, lng: number): Observable<any> {
    const params = {
      q: `${lat},${lng}`,
      key: this.apiKey,
    };
    return this.http.get(this.apiUrl, { params });
  }
}
