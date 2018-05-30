import { Component } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { UserService } from './user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public http: Http, private UServ: UserService, ) { }

}
