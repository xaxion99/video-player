import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}
  
  ngOnInit() {}

  login() {
    const un = this.form.controls.username.value;
    const pw = this.form.controls.password.value;
    const res = this.auth.login(un, pw);
    if(res == true) {
      console.log('Login Success');
    } else {
      console.log('Login Failure');
    }
  }

}
