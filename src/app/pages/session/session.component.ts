import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SESSION, USER, SPEAKER } from 'src/app/models';
import { SessionService } from 'src/app/providers/session.service';
import { UserService } from 'src/app/providers/user.service';
import { GeneralService } from 'src/app/providers/general.service';
import { SpeakerService } from 'src/app/providers/speaker.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  session: SESSION;
  user: USER;
  speakers: SPEAKER[];
  navbar: any;

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private speakerService: SpeakerService,
              private genService: GeneralService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.sessionService.getSessionById(id).then(res => this.session = res);
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
    return this.user.favorites.find(f => f.id === id)
  }
  onExit() {
    this.router.navigate(['../..'], { relativeTo: this.activatedRoute })
  }
}
