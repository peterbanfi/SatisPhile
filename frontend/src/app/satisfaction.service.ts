import { Injectable } from '@angular/core';

import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class SatisfactionService {

  constructor(public http: HttpClient, private cookieService: CookieService) { }

  getSat() {
    const user = this.cookieService.get('abc');
  }



}
