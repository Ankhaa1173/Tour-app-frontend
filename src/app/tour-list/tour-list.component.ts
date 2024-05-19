import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourItemCardComponent } from '../tour-item-card/tour-item-card.component';
import { HttpService } from '../../services/http-service.service';
import { TourListService } from '../../services/tour-list.service';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [TourItemCardComponent, CommonModule, FilterComponent],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss',
})
export class TourListComponent implements OnInit {
  @Input() showFilter: boolean = true;
  @Input() initFilter: any;
  @Input() title: string = 'Tours';
  private getDataByNavigation = false;
  tourData: any;
  filter: string;
  navigationSubscribe: any;
  constructor(
    private http: HttpService,
    private service: TourListService,
    private router: Router,
    private storage: LocalStorageService
  ) {
    this.navigationSubscribe = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd && e.url === '/tour-list') {
        this.getDataByNavigation = false;
        this.ngOnInit();
        this.getDataByNavigation = true;
      }
    });
  }

  ngOnInit() {
    if (!this.getDataByNavigation) {
      this.initFilter = this.service.passedData;
      console.log('inited');
      this.getAllTours();
    }
  }

  ngOnDestroy() {
    if (this.navigationSubscribe) {
      this.navigationSubscribe.unsubscribe();
    }
  }

  getAllTours() {
    if (this.initFilter) {
      this.http
        .getTourList('tourList', this.initFilter)
        .subscribe((resultData: any) => {
          console.log(resultData);
          this.tourData = resultData;
        });
    } else {
      this.http.getData('tourList').subscribe((resultData: any) => {
        console.log(resultData);
        this.tourData = resultData;
      });
    }
    // if (this.filter) {
    //   this.http
    //     .getTourList('tourList', this.filter)
    //     .subscribe((resultData: any) => {
    //       console.log(resultData);
    //       this.tourData = resultData;
    //     });
    // } else {
    //   this.http.getData('tourList').subscribe((resultData: any) => {
    //     console.log(resultData);
    //     this.tourData = resultData;
    //   });
    // }
  }
}
