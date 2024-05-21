import { Component } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { TourItemCardComponent } from '../tour-item-card/tour-item-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { TourListComponent } from '../tour-list/tour-list.component';
import { TourListService } from '../../services/tour-list.service';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [TourListComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  tourData: any;
  constructor(
    private http: HttpService,
    private router: Router,
    private storage: LocalStorageService,
    private listService: TourListService
  ) {}
  ngOnInit() {}
  searchList(filter: any) {
    this.listService.passedData = filter;
    if (this.router.url === '/tour-list') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/tour-list']);
      });
    } else {
      this.router.navigate(['/tour-list']);
    }
  }
}
