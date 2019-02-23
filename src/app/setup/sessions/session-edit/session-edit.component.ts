import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION, SPEAKER, TRACK } from 'src/app/models';
import { SessionService } from 'src/app/providers/session.service';
import { GeneralService } from 'src/app/providers/general.service';
import { TrackService } from 'src/app/providers/track.service';
import { SpeakerService } from 'src/app/providers/speaker.service';

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.css']
})
export class SessionEditComponent implements OnInit {

  id: string = '';
  mode: string = '';
  navbar: any;
  errorMessage = '';
  isSelectSpeakers = false;
  isSelectTracks = false;
  isSelectLocation = false;

  session: SESSION = {
    name: '',
    date: this.genService.getDateFormat(),         // 2018-12-06
    timeStart: '10:00',    // 15:30 for 3:30pm
    timeEnd: '10:00',
    room: '',
    location: { id: '', name: '' },
    description: '',
    speakerIDs: [],   // speaker's id
    tracks: [],   //  name of track
  };
  speakers: SPEAKER[] = [];
  tracks: TRACK[] = [];

  constructor(private sessionService: SessionService,
              private genService: GeneralService,
              private trackService: TrackService,
              private speakerService: SpeakerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.params['id'];
    if (this.mode !== 'New') {
      [this.id, this.mode] = [this.mode, 'Edit'];
      this.sessionService.getSessionById(this.id).then(res => {
        this.session = res;
        if (!this.session.location) {
          this.session.location = { id: '', name: '' }
        }
      });
    }
    this.getSpeakersTracks();
    this.navbar = document.getElementsByClassName('fixed-top')[0];
    this.navbar.setAttribute('position', 'relative');
    this.navbar.setAttribute('display', 'none');
  }

  getSpeakersTracks() {
    this.speakerService.getSpeakers().subscribe(res => this.speakers = res);
    this.trackService.getTracks().subscribe(res => this.tracks = res);
  }

  isInSession(key, type) {
    if (type === 'speaker') {
      return this.session.speakerIDs.find(id => id === key);
    }
    return this.session.tracks.find(name => name === key)
  }

  removeSpeaker(key) {
    const index = this.session.speakerIDs.findIndex(id => id === key);
    if (index > -1) {
      this.session.speakerIDs.splice(index, 1);
    }
  }

  removeTrack(key) {
    const index = this.session.tracks.findIndex(name => name === key);
    if (index > -1) {
      this.session.tracks.splice(index, 1);
    }
  }

  submitSpeakers(data) {
    this.session.speakerIDs = data.slice();
    this.isSelectSpeakers = false;
  }

  submitTracks(data) {
    this.session.tracks = data.slice();
    this.isSelectTracks = false;
  }

  submitLocation(data) {
    this.session.location = data;
    this.isSelectLocation = false;
  }

  onSubmit() {
    this.session.name = this.session.name.trim();
    if (this.session.name.length < 3) {
      this.errorMessage = 'At least 3 letters are required for Title.'
    } else if (this.session.timeEnd < this.session.timeStart) {
      this.errorMessage = "Ending time cannot be earlier than Starting time."
    } else {
      if (this.mode === 'New') {
        this.sessionService.addNewSession(this.session);
      } else {
        this.sessionService.updateSession(this.session);
      }
      this.onExit();
    }
  }

  onExit() {
    this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
  }
}

/*
export interface SESSION {
  id?: string;
  name: string;
  date: string;         // 2018-12-06
  timeStart: string;    // 15:30 for 3:30pm
  timeEnd?: string;
  location?: string;
  description?: string;
  speakerIDs: string[];   // speaker's id
  tracks: string[];     //  name of track
  hide?: boolean;
}
*/