import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  pieChartData = {
    chartType: 'LineChart',
    dataTable: [
      [`Fun Chart`, 'Satisfaction'],
      [`2018-05-01`, 30],
      [`2018-05-02`, 50],
      [`2018-05-03`, 36],
      [`2018-05-04`, 66],
      [`2018-05-05`, 70],
      [`2018-05-06`, 88],

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
  pieChartData2 = {
    chartType: 'LineChart',
    dataTable: [
      [`Work Chart`, 'Satisfaction'],
      [`2018-05-01`, 53],
      [`2018-05-02`, 59],
      [`2018-05-03`, 53],
      [`2018-05-04`, 66],
      [`2018-05-05`, 60],
      [`2018-05-06`, 43],

    ],
    options: {
      'title': 'Work Chart',
      is3D: true,
      curveType: 'function',
      legend: { position: 'top' },
      'width': '100%',
      'height': 300
    },
  };
  pieChartData3 = {
    chartType: 'LineChart',
    dataTable: [
      [`Food Chart`, 'Satisfaction'],
      [`2018-05-01`, 70],
      [`2018-05-02`, 59],
      [`2018-05-03`, 83],
      [`2018-05-04`, 72],
      [`2018-05-05`, 94],
      [`2018-05-06`, 65],

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
  pieChartData4 = {
    chartType: 'LineChart',
    dataTable: [
      [`Sleep Chart`, 'Satisfaction'],
      [`2018-05-01`, 53],
      [`2018-05-02`, 23],
      [`2018-05-03`, 44],
      [`2018-05-04`, 61],
      [`2018-05-05`, 25],
      [`2018-05-06`, 33],
    ],
    options: {
      'title': 'Sleep Chart',
      is3D: true,
      curveType: 'function',
      legend: { position: 'top' },
      'width': '100%',
      'height': 300
    },
  };


  constructor() { }

  ngOnInit() {
  }

}
