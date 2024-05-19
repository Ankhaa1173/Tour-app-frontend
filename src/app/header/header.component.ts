import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TourListService } from '../../services/tour-list.service';
import { Emitters } from '../emitters/emitters';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http-service.service';
import { MatSelectModule } from '@angular/material/select';
import { LocalStorageService } from '../../services/local-storage.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

interface Currency {
  name: string;
  value: number;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSelectModule, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  searchText: string;
  authenticated = false;
  currencyArr: Currency[] = [
    { name: 'MNT', value: 1 },
    { name: 'USD', value: 3300 },
    { name: 'EUR', value: 3600 },
    { name: 'JPY', value: 22 },
  ];
  constructor(
    private router: Router,
    private listService: TourListService,
    private http: HttpService,
    private storageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.http.checkUser().subscribe({
      next: (res) => Emitters.authEmitter.emit(true),
      error: (err) => {
        Emitters.authEmitter.emit(false);
        this.storageService.logout();
      },
    });
  }
  searchList() {
    this.listService.passedData = { company: this.searchText };
    this.router.navigate(['/tour-list']);
  }
  userPage() {
    this.router.navigate(['/user-page']);
  }
  logout() {
    this.http.logout();
    Emitters.authEmitter.emit(false);
    this.storageService.logout();
    this.router.navigate(['']);
  }
  login() {
    this.router.navigate(['/login']);
  }
}
