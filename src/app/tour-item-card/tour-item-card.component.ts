import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TourDetailService } from '../../services/tour-detail.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { TourDetailComponent } from '../tour-detail/tour-detail.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from '../../services/http-service.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'tour-item-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './tour-item-card.component.html',
  styleUrl: './tour-item-card.component.scss',
})
export class TourItemCardComponent implements OnInit {
  @Input() tourName: string;
  @Input() tourLevel: number;
  @Input() tourPrice: number;
  @Input() tourId: number;
  @Input() imgPath: string;
  faHeart: any;
  authenticated = false;
  constructor(
    private detailService: TourDetailService,
    private router: Router,
    private dialog: MatDialog,
    private storage: LocalStorageService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    if (!this.imgPath) {
      this.imgPath = '../../assets/testImage.png';
    } else {
      this.imgPath = 'http://127.0.0.1:8000/' + this.imgPath;
    }
    this.getHeartType();
  }

  handleClick() {
    // this.detailService.passedData = this.tourId;
    this.storage.setTourID(this.tourId);

    this.router.navigate(['/tour-detail']);
    console.log('its been clicked');
    // let dialogRef = this.dialog.open(TourDetailComponent, {
    //   height: '30em',
    //   width: '100em',
    // });
  }
  getImage() {
    return '/Tour-app/storage/image6.png';
  }
  addTourToBasket() {
    if (localStorage.getItem('jwt')) {
      let toursRaw = localStorage.getItem('tourBasket');
      let tours: number[] = JSON.parse(toursRaw == null ? '[]' : toursRaw);
      if (this.faHeart == faHeartSolid) {
        console.log('solid');
        tours = tours.filter((item) => item !== this.tourId);
      } else {
        tours.push(this.tourId);
      }
      localStorage.setItem('tourBasket', JSON.stringify(tours));
      this.getHeartType();
    }
  }
  getHeartType() {
    let toursRaw = localStorage.getItem('tourBasket');
    let tours: number[] = JSON.parse(toursRaw == null ? '[]' : toursRaw);
    if (tours.includes(this.tourId)) {
      this.faHeart = faHeartSolid;
    } else {
      this.faHeart = faHeartRegular;
    }
  }
}
