import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LOCATION } from 'src/app/models';
import { LocationService } from 'src/app/providers/location.service';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.css']
})
export class SelectLocationComponent implements OnInit {

  @Input() currLocation: string;
  @Output() submitLocation = new EventEmitter<any>();
  @Output() exitSelection = new EventEmitter();
  locations: LOCATION[] = [];
  location: LOCATION;
  queryText = '';
  mapMessage = 'Will show map here!'
  found = false;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getLocations().subscribe(res => this.locations = res);
  }
  
  showMap(location: LOCATION) {
    if (location.lat * location.lng != 0) {
      this.location = location;
      this.found = true;
    } else {
      this.found = false;
      this.mapMessage = 'No information to load map!';
    }
  }

  onSubmit(location: LOCATION) {
    this.submitLocation.emit({
      id: location.id,  name: location.name
    })
  }

  onExit() {
    this.exitSelection.emit();
  }
}
