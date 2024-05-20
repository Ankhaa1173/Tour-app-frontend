import { Component } from '@angular/core';
import { GeolocationService } from '../../services/geo-location.service';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-location-panel',
  standalone: true,
  imports: [],
  templateUrl: './location-panel.component.html',
  styleUrl: './location-panel.component.scss',
})
export class LocationPanelComponent {
  location: any;

  constructor(
    private geolocationService: GeolocationService,
    private geocodingService: GeocodingService
  ) {}
  ngOnInit(): void {
    this.geolocationService
      .getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        this.geocodingService
          .reverseGeocode(latitude, longitude)
          .subscribe((response) => {
            if (response && response.results && response.results.length > 0) {
              const components = response.results[0].components;
              this.location = {
                city: components.city || components.town || components.village,
                country: components.country || components.continent,
              };
              console.log(this.location);
              console.log(components);
            }
          });
      })
      .catch((error) => {
        console.error('Error getting location', error);
      });
  }
}
