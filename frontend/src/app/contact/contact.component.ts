import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  about: Boolean = false;
  contact: Boolean = false;
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
    chartType: 'ColumnChart',
    dataTable: [
      [`Work Chart`, 'hours'],
      [`2018-05-01`, 5.3],
      [`2018-05-02`, 5.9],
      [`2018-05-03`, 5.3],
      [`2018-05-04`, 6.6],
      [`2018-05-05`, 6.0],
      [`2018-05-06`, 4.3],

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
    chartType: 'PieChart',
    dataTable: [
      [`Food Chart`, 'Satisfaction'],
      [`Fruits`, 10],
      [`Vegetables`, 29],
      [`Meat`, 61],

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
      [`Sleep Chart`, 'hours'],
      [`2018-05-01`, 5.3],
      [`2018-05-02`, 2.3],
      [`2018-05-03`, 4.4],
      [`2018-05-04`, 6.1],
      [`2018-05-05`, 2.5],
      [`2018-05-06`, 3.3],
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

  showAbout() {
    this.about = !this.about;
    this.contact = false;
  }
  showContact() {
    this.contact = !this.contact;
    this.about = false;
  }

}
