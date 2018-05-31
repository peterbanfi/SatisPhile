import { Component, OnInit } from '@angular/core';

import { SatisfactionService } from '../satisfaction.service';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url: String = '//localhost:8080/satisfaction';
  satisfactions: any;
  mine: any = [];
  constructor(public http: HttpClient, private cookieService: CookieService, private SServ: SatisfactionService, ) { }

  ngOnInit() {
    this.listAll(this.url);
  }

  /*   service() {
      console.log(this.SServ.listAll(this.url));
    } */

  listAll(url) {
    this.http.get(url)
      .subscribe(data => {
        console.log(data);
        this.satisfactions = data;
        this.listMine(this.satisfactions);
      });
  }

  listMine(data) {
    const user = this.cookieService.get('abc');
    for (let i = 0; i < data.length; i++) {
      if (user === data[i]['user']['_id']) {
        this.mine.push(data[i]);
      }
      this.setProgressBars(this.mine);

    }
  }

  setProgressBars(data) {
    const sleep = document.getElementById('sleep');
    const food = document.getElementById('food');
    const work = document.getElementById('work');
    const fun = document.getElementById('fun');
    sleep.style.width = `${data[0].sleep}%`;
    food.style.width = `${data[0].food}%`;
    work.style.width = `${data[0].work}%`;
    fun.style.width = `${data[0].fun}%`;
  }


}
