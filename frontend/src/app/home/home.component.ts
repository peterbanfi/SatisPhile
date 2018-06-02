import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions } from '@angular/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  togLogin: Boolean = false;



  user: any = {
    username: 'admin@admin.com',
    password: 'adminadmin'
  };

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http, private UServ: UserService, ) {

  }
  ngOnInit() {
  }

  profile() {
    this.UServ.profile(this.baseUrl + 'profile', this.options);
  }

  login() {
    this.UServ.login(this.baseUrl + 'login', this.user, this.options);
  }

  logout() {
    this.UServ.logout(this.baseUrl + 'logout', this.options);
  }

  toggleLogin() {
    this.togLogin = !this.togLogin;
  }
}
