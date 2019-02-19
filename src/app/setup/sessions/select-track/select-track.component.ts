import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrackService } from 'src/app/providers/track.service';

@Component({
  selector: 'app-select-track',
  templateUrl: './select-track.component.html',
  styleUrls: ['./select-track.component.css']
})
export class SelectTrackComponent implements OnInit {

  @Input() tracksInSession: string[];
  @Output() submitTracks = new EventEmitter<string[]>();
  @Output() exitSelection = new EventEmitter();
  tracks: { name: string, isChecked: boolean }[] = [];

  constructor(private trackService: TrackService) { }

  ngOnInit() {
    this.trackService.getTracks().subscribe(res => {
      res.forEach(t => {
        this.tracks.push({
          name: t.name, isChecked: this.isSelected(t.name) 
        })
      })
    })
  }

  isSelected(key) {
    if (this.tracksInSession.find(name => name === key)) {
      return true;
    }
    return false;
  }

  onClick(index) {
    this.tracks[index].isChecked = !this.tracks[index].isChecked;
  }

  onCheckAction(res) {
    this.tracks.forEach( t => t.isChecked = res);
  }

  onSubmit() {
    const data = [];
    this.tracks.forEach(t => {
      if (t.isChecked) { data.push(t.name) }
    });
    this.submitTracks.emit(data);
  }

  onExit() {
    this.exitSelection.emit();
  }
}
