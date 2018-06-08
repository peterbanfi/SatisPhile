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
  sati: any = [];
  category: any = 'sleep';
  type: any = 'LineChart';
  pieChartData = {
    chartType: 'LineChart',
    dataTable: [
      [`Chart`, 'Satisfaction'],

    ],
    options: {
      'title': 'Chart',
      is3D: true,
      curveType: 'function',
      legend: { position: 'top' },
      'width': '100%',
      'height': 300
    },
  };
  displayChart: Boolean = false;
  dateReady: Boolean = false;

  constructor(public http: HttpClient, private cookieService: CookieService, private SServ: SatisfactionService, ) { }

  ngOnInit() {

    this.listAll(this.url);
  }

  listAll(url) {
    this.http.get(url)
      .subscribe(data => {
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
    }
    this.setProgressBars(this.mine);
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
    //Ez a frissen hozzáadott értékeket jeleníti meg a képernyőn.
    const sleep = document.getElementById('sleep');
    const food = document.getElementById('food');
    const work = document.getElementById('work');
    const fun = document.getElementById('fun');
    for (const key in this.newSat) {
      if (this.newSat.hasOwnProperty(key)) {
        const element = this.newSat[key];
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
    sleep.style.width = `${this.newSat.sleep}%`;
    food.style.width = `${this.newSat.food}%`;
    work.style.width = `${this.newSat.work}%`;
    fun.style.width = `${this.newSat.fun}%`;
    //A list all azért kell, hogy az ngModel a %-ot is hozzáadja a legutolsó bevitt adathoz
    setTimeout(() => {
      this.listAll(this.url);

    }, 1000);
  }

  populateChart() {
    let i = this.mine.length - 1;
    let k = 0;
    if (i < 6) {
      k = i;
    } else {
      k = 6;
    }
    while (i >= 0) {
      const d = new Date(this.mine[i]['createdAt']);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      const hour = d.getHours();
      const minute = d.getMinutes();
      const date = `${year}-${month + 1}-${day} ${hour}:${minute}`;
      this.sati.push([date, this.mine[i][`${this.category}`]]);
      i--;
    }
    while (k >= 0) {
      this.pieChartData['dataTable'].push(this.sati[k]);
      k--;
    }
    this.pieChartData['dataTable'][0] = [`${this.category} Chart`, 'Satisfaction'];
    this.pieChartData['options']['title'] = this.category;
    this.pieChartData['chartType'] = this.type;
    const clone = JSON.parse(JSON.stringify(this.pieChartData));
    this.pieChartData = clone;
    this.displayChart = true;
    /* Reset the chart. */
    setTimeout(() => {
      i = this.mine.length - 1;
      if (i < 6) {
        k = i;
      } else {
        k = 6;
      }
      while (k >= 0) {
        this.pieChartData['dataTable'].pop();
        k--;
      }
      this.sati = [];
    }, 1000);
  }

  selectChangeHandler(event: any) {
    this.category = event.target.value;
  }
  selectChangeHandler2(event: any) {
    this.type = event.target.value;
  }
}
