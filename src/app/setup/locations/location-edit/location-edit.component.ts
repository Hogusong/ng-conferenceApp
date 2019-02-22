import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';

import { LOCATION } from 'src/app/models';
import { LocationService } from 'src/app/providers/location.service';
import { SessionService } from 'src/app/providers/session.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  id = '';
  mode = '';
  found = false;
  mapMessage = 'Show map here!';
  location: LOCATION = {
    name: '',
    streetNo: '',
    street: '',
    suiteNo: '',
    city: '',
    state: '',
    zipCode: '',
    lat: null,
    lng: null
  }
  apiKey = environment.map_api;

  constructor(private locationService: LocationService,
              private sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: Http) { }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.params['id'];
    if (this.mode !== 'New') {
      [this.id, this.mode] = [this.mode, 'Edit'];
      this.locationService.getLocationById(this.id).then(res => {
        this.location = res;
      });
    }
  }

  showMap() {
    this.getlatlng().subscribe(res => {
      const results = res.json().results;
      if (results.length > 0 ) {
        this.location.lng = results[0].geometry.location.lng;
        this.location.lat = results[0].geometry.location.lat;
        this.found = true;
      } else {
        this.found = false;
      }
      this.mapMessage = this.found ? 'Show map here!' : 'Cannot find location!';
    })
  }

  getlatlng() {
    this.found = false;
    const address = this.location.streetNo.trim() + ' ' + 
                    this.location.street.trim() + ' ' +
                    this.location.city.trim() + ' ' + this.location.state.trim();
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + this.apiKey);
  }

  onSubmit() {
    this.location.lng = null;
    this.location.lat = null;

    this.getlatlng().subscribe(res => {
      const results = res.json().results;
      if (results.length > 0 ) {
        this.location.lng = results[0].geometry.location.lng;
        this.location.lat = results[0].geometry.location.lat;
      }
      if (this.mode === 'New') {
        this.locationService.addLocation(this.location);
      } else {
        this.locationService.updateLocation(this.location);
        this.sessionService.updateLocationInSession(this.location.id, this.location.name);
      }
    });
    this.onExit();    
  }

  onExit() {
    this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
  }
}
