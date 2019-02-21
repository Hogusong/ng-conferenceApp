import { Component, OnInit } from '@angular/core';
import { LOCATION } from 'src/app/models';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: LOCATION[] = [{
    name: 'Tween Tower',
    streetNo: '125',
    streetName: '3rd AVe.',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  }];
  queryText = '';

  constructor() { }

  ngOnInit() {
  }

}
