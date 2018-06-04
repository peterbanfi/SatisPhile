import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { UserService } from '../user.service';
import { HttpClient } from 'selenium-webdriver/http';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';
  user: any = '';
  loggedIn: any = false;
  myDate: any;
  constructor(public http: Http, private cookieService: CookieService) {
    this.profile();
  }

  ngOnInit() {
    this.clock();
  }

  profile() {
    if (this.cookieService.get('xyz') === 'true') {
      this.user = this.cookieService.get('zzxy');
      this.loggedIn = true;
    } else {
      return;
    }
  }

  clock() {
    setInterval(() => {
      this.myDate = new Date();
    }, 1000);
  }

}
