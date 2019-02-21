import { Component, OnInit } from '@angular/core';
import { LOCATION } from 'src/app/models';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

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
