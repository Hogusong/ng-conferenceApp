import { Component, OnInit } from '@angular/core';
import { TRACK } from 'src/app/models';
import { TrackService } from 'src/app/providers/track.service';
import { SessionService } from 'src/app/providers/session.service';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  isNew: boolean;
  onChange = false;
  activateConfirm = false;
  confirmMessage: string;
  confirmTitle: string;

  tracks: TRACK[];
  selectedTrack: TRACK;
  description: string;
  title: string;
  name: string;
  currentName: string;
  errMessage: string;
  queryText = '';

  constructor(private trackService: TrackService,
              private sessionService: SessionService,
              private userService: UserService) { }

  ngOnInit() {
    this.trackService.getTracks().subscribe(res => this.tracks = res);
  }

  onEditTrack(data) {
    if (data === 'New') {
      this.isNew = true;
      this.title = 'New Track';
      this.description = 'Enter a name for New Track.'
    } else {
      this.selectedTrack = data;
      this.isNew = false;
      this.description = 'Enter a new name instade of'
      this.title = 'Change Track';
      this.currentName = data.name;
    }
    this.onChange = true;
  }

  onSubmitResult(name: any) {
    if (name) {
      const result = this.tracks.find(track => track.name === name);
      if (result) {
        this.errMessage = 'Name is used already. Try another';
      } else if (this.isNew) {
        this.trackService.addTrack({ name: name });
        this.userService.addTrackInUser(name);
        this.onChange = false;
      } else {
        const oldName = this.selectedTrack.name;
        this.selectedTrack.name = name;
        this.trackService.updateTrack(this.selectedTrack);
        this.userService.updateTrackInUser(oldName, name);
        this.onChange = false;
      }
    } else {
      this.onChange = false;
    }
  }

  onRemoveTrack(track) {
    this.activateConfirm = true;
    this.selectedTrack = track;
    this.confirmMessage = 'Are you sure to delete this track?';
    this.confirmTitle = track.name;
  }

  getConfirm(result) {
    if (result) {
      this.trackService.removeTrack(this.selectedTrack);
      this.userService.removeTrackInUser(this.selectedTrack.name);
      this.sessionService.removeTrackInSession(this.selectedTrack.name);
    }
    this.activateConfirm = false;
    this.selectedTrack = null;
  }
}
