import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrackService } from 'src/app/providers/track.service';
import { TRACK } from 'src/app/models';

@Component({
  selector: 'app-select-track',
  templateUrl: './select-track.component.html',
  styleUrls: ['./select-track.component.css']
})
export class SelectTrackComponent implements OnInit {

  @Output() submitTrack = new EventEmitter<any>();
  @Output() exitSelectTrack = new EventEmitter();
  tracks: TRACK[];

  constructor(private trackService: TrackService) {
    this.trackService.getTracks().subscribe(res => this.tracks = res);
  }

  ngOnInit() {
  }

  selectTrack(name) {
    const excludeTracks = [];
    this.tracks.forEach(track => {
      if (track.name !== name) { excludeTracks.push(track.name); }
    })
    this.submitTrack.emit(excludeTracks);
  }
  
  onExit() {
    this.exitSelectTrack.emit();
  }

}
