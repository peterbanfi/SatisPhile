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
  options = new RequestOptions({ withCredentials: true });
  satisfactions: any;
  mine: any = [];
  newSat: any = {
    sleep: 50,
    food: 50,
    work: 50,
    fun: 50,
    user: '',
  };
  pieChartData = {
    chartType: 'LineChart',
    dataTable: [
      ['Food Chart', 'Satisfaction'],

    ],
    options: {
      'title': 'Food Chart',
      is3D: true,
      curveType: 'function',
      legend: { position: 'top' },
      'width': '100%',
      'height': 300
    },
  };
  food: any = [];
  pieChartData2 = {
    chartType: 'LineChart',
    dataTable: [
      ['Fun Chart', 'Satisfaction'],

    ],
    options: {
      'title': 'Fun Chart',
      is3D: true,
      curveType: 'function',
      legend: { position: 'top' },
      'width': '100%',
      'height': 300
    },
  };
  fun: any = [];
  displayChart: Boolean = false;
  dateReady: Boolean = false;

  constructor(public http: HttpClient, private cookieService: CookieService, private SServ: SatisfactionService, ) { }

  ngOnInit() {
    this.listAll(this.url);
  }

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
    for (const key in data[data.length - 1]) {
      if (data[data.length - 1].hasOwnProperty(key)) {
        const element = data[data.length - 1][key];
        if (key === 'food' || key === 'work' || key === 'fun' || key === 'sleep') {
          /* Le kell venni az előzőleg hozzáadott classokat */
          document.getElementById(key).classList.remove('bg-danger');
          document.getElementById(key).classList.remove('bg-success');
          document.getElementById(key).classList.remove('bg-info');
          if (element < 46) {
            document.getElementById(key).classList.add('bg-danger');
          }
          if (element > 46 && element < 80) {
            document.getElementById(key).classList.add('bg-info');
          }
          if (element >= 80) {
            document.getElementById(key).classList.add('bg-success');
          }
        }
      }
    }
    sleep.style.width = `${data[data.length - 1].sleep}%`;
    food.style.width = `${data[data.length - 1].food}%`;
    work.style.width = `${data[data.length - 1].work}%`;
    fun.style.width = `${data[data.length - 1].fun}%`;
    this.dateReady = true;
  }

  addNewSat() {
    this.newSat['user'] = this.cookieService.get('abc');
    this.SServ.addSat(this.url, this.newSat, this.options);
    this.listAll(this.url);
  }

  populateChart() {

    let i = 6;
    let k = 6;
    while (i >= 0) {
      const d = new Date(this.mine[i]['createdAt']);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      const date = `${year}-${month + 1}-${day}`;
      this.food.push([date, this.mine[i]['food']]);
      i--;
    }
    while (k >= 0) {
      this.pieChartData['dataTable'].push(this.food[k]);
      k--;
    }
    console.log(this.food);
    const clone = JSON.parse(JSON.stringify(this.pieChartData));
    this.pieChartData = clone;

    let i2 = 6;
    let k2 = 6;
    while (i2 >= 0) {
      const d2 = new Date(this.mine[i2]['createdAt']);
      const year2 = d2.getFullYear();
      const month2 = d2.getMonth();
      const day2 = d2.getDate();
      const date2 = `${year2}-${month2 + 1}-${day2}`;
      this.fun.push([date2, this.mine[i2]['fun']]);
      i2--;
    }
    while (k2 >= 0) {
      this.pieChartData2['dataTable'].push(this.fun[k2]);
      k2--;
    }
    console.log(this.fun);
    const clone2 = JSON.parse(JSON.stringify(this.pieChartData2));
    this.pieChartData2 = clone2;
    this.displayChart = true;
  }

}
