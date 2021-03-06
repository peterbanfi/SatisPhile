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
        this.cookieService.put('abc', data['user']['_id']);
        this.cookieService.put('zzxy', data['user']['username']);
        this.cookieService.put('xyz', 'true');
      });
  }

  logout(url, options) {
    this.http.get(url, options)
      .subscribe(data => {
        this.cookieService.remove('abc');
        this.cookieService.remove('xyz');
        this.cookieService.remove('zzxy');
      });
  }
}
