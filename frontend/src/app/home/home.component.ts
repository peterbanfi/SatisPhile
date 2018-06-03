import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { UserService } from '../user.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  togLogin: Boolean = false;
  togLogged: Boolean = false;
  done: Boolean = false;
  dashboard: Boolean = false;
  signUp: Boolean = false;
  user: any = {
    username: '',
    password: ''
  };
  userReg: any = {
    email: '',
    username: '',
    password: ''
  };
  userRegPassConf: String = '';

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http, private UServ: UserService, private cookieService: CookieService) {

  }
  ngOnInit() {
    this.checkLog();
  }

  profile() {
    this.UServ.profile(this.baseUrl + 'profile', this.options);
  }

  login() {
    this.UServ.login(this.baseUrl + 'login', this.user, this.options);
    setTimeout(() => {
      const logged = this.cookieService.get('xyz');
      if (logged === 'true') {
        this.dashboard = true;
      }
    }, 1000);
  }

  logout() {
    this.UServ.logout(this.baseUrl + 'logout', this.options);
    this.togLogged = false;
    this.dashboard = false;
    this.togLogin = false;
  }

  toggleLogin() {
    this.togLogin = !this.togLogin;
  }

  checkLog() {
    const user = this.cookieService.get('abc');
    if (user !== undefined) {
      this.togLogged = true;
      this.togLogin = false;
      this.dashboard = true;
    }
  }

  toggleSignUp() {
    this.signUp = !this.signUp;
  }

  register() {
    this.http.post(`${this.baseUrl}register`, this.userReg, this.options)
      .subscribe(data => {
        console.log(data);
      });
  }

  validation() {
    if (this.userReg.username === '' || this.userReg.email === '' || this.userReg.password === '' || this.userRegPassConf === '') {
      return alert('Please Fill the form!');
    }
    if (this.userReg.password !== this.userRegPassConf) {
      return alert('Confirm your password!');
    } else {
      this.register();
      alert('Thank you! You can login now!');
    }
  }

}
