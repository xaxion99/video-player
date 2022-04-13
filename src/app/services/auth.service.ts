import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  allowedUsername = 'FuckNetflix';
  allowedPassword = 'FuckDisney+';

  hasToken = false;

  constructor(private router: Router) { }

  login(un:string, pw:string) {
    let res = false;
    if (un == this.allowedUsername && pw == this.allowedPassword) {
      localStorage.setItem('token', 'secretTVToken');
      localStorage.setItem('is_admin', 'true');
      this.router.navigate(['home']);
      res = true;
    }
    return res;
  }

  logout(){
    localStorage.removeItem('token');
    this.hasToken = false;
    this.router.navigate(['']);
    return true;
  }

  isLoggedIn(){
    if (localStorage.getItem('token') == 'secretTVToken'){
      this.hasToken = true;
    }
    return this.hasToken;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
