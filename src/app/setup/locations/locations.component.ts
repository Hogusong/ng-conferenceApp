import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LOCATION } from 'src/app/models';
import { LocationService } from 'src/app/providers/location.service';
import { SessionService } from 'src/app/providers/session.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: LOCATION[] = [];
  selectedLocation: LOCATION;
  queryText = '';
  activateConfirm = false;
  confirmMessage = '';
  confirmTitle = '';

  constructor(private locationService: LocationService,
              private sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe(res => this.locations = res);
  }

  onEditLocation(type: string) {
    this.router.navigate(['edit', type], { relativeTo: this.activatedRoute });
  }

  onRemoveSpeaker(location: LOCATION) {
    this.activateConfirm = true;
    this.selectedLocation = location;
    this.confirmMessage = 'Are you sure to delete this session?';
    this.confirmTitle = location.name;
  }

  getConfirm(result) {
    if (result) {
      this.locationService.removeLocation(this.selectedLocation);
      this.sessionService.removeLocationInSession(this.selectedLocation.id);
    }
    this.activateConfirm = false;
    this.selectedLocation = null;
  }
}
