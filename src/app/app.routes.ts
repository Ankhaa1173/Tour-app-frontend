import { Routes } from '@angular/router';
import { TourListComponent } from './tour-list/tour-list.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TourDetailRateComponent } from './tour-detail-rate/tour-detail-rate.component';
import { TourDetailAddItemComponent } from './tour-detail-add-item/tour-detail-add-item.component';
import { DropdownComponent } from './dropdown/dropdown.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'tour-list',
    component: TourListComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'tour-detail', component: TourDetailComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tour-detail-rate', component: TourDetailRateComponent },
  { path: 'tour-detail-add-item', component: TourDetailAddItemComponent },
  { path: 'dropdowntest', component: DropdownComponent },
];
