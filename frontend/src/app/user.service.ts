import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class UserService {

  constructor(public http: HttpClient, private cookieService: CookieService) { }

  profile(url, options) {
    this.http.get(url, options)
      .subscribe(data => {
        console.log(data);
      });
  }

  login(url, user, options) {
    this.http.post(url, user, options)
      .subscribe(data => {
        if (data['login']) {
          this.setCookie(options);
        }
      });
  }

  setCookie(options) {
    this.http.get('//localhost:8080/user/profile', options)
      .subscribe(data => {
        console.log(data);
        this.cookieService.put('abc', data['user']['_id']);
      });

  }

  logout(url, options) {
    this.http.get(url, options)
      .subscribe(data => {
        console.log(data);
        this.cookieService.remove('abc');
      });
  }
}
