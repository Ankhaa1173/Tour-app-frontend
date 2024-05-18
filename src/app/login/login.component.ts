import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpService } from '../../services/http-service.service';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private locationService: Location
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
  }
  submit() {
    this.http.loginUser(this.form.getRawValue()).subscribe((res: any) => {
      localStorage.setItem('jwt', res['jwt']);
      Emitters.authEmitter.emit(true);
      this.locationService.back();
    });
  }
}
