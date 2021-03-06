import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SESSION, USER, SPEAKER, LOCATION } from 'src/app/models';
import { SessionService } from 'src/app/providers/session.service';
import { UserService } from 'src/app/providers/user.service';
import { GeneralService } from 'src/app/providers/general.service';
import { SpeakerService } from 'src/app/providers/speaker.service';
import { LocationService } from 'src/app/providers/location.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  session: SESSION;
  user: USER;
  speakers: SPEAKER[] = [];
  navbar: any;
  favorites: { id: string, name: string }[] = [];
  activateMap = false;
  latitude = null;
  longitude = null;

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private speakerService: SpeakerService,
              private genService: GeneralService,
              private locService: LocationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sessionService.getSessionById(id).then(res => {
      this.session = res;
      if (!this.session.room) { this.session.room = 'unknown' }
      if (!this.session.location) {      
        this.session.location = { id: '',  name: 'unknown'}
      }
    });
    this.genService.getUser().then(res => this.user = res);
    this.speakerService.getSpeakers().subscribe(res => this.speakers = res);
    this.navbar = document.getElementsByClassName('fixed-top')[0];
    this.navbar.setAttribute('position', 'relative')
    this.navbar.setAttribute('display', 'none');
  }

  findSpeaker(id) {
    const speaker = this.speakers.find(s => s.id === id);
    return speaker ? speaker.name : 'Unknown';
  }

  isFavorite(id) {
    if (this.user) {
      return this.user.favorites.find(f => f.id === id);
    }
    return null;
  }

  toggleFavorite(session: SESSION, type: string) {
    if (type === 'add') {
      this.user.favorites.push({ id: session.id, name: session.name });
    } else {
      const index = this.user.favorites.findIndex(f => f.id === session.id);
      if (index > -1) {
        this.user.favorites.splice(index, 1);
      }
    }
    this.userService.updateUser(this.user);
    this.genService.setUser(this.user);
  }

  onExit() {
    this.router.navigate(['../..'], { relativeTo: this.activatedRoute })
  }

  showTheMap(id) {
    if (id) {
      this.locService.getLocationById(id).then((res:LOCATION) => {
        this.longitude = res.lng;
        this.latitude = res.lat;
        this.activateMap = this.latitude * this.longitude != 0
      });
    }
  }
}
