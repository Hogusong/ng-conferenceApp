import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralService } from 'src/app/providers/general.service';
import { TRACK, USER } from 'src/app/models';
import { TrackService } from 'src/app/providers/track.service';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-reset-filter',
  templateUrl: './reset-filter.component.html',
  styleUrls: ['./reset-filter.component.css']
})
export class ResetFilterComponent implements OnInit {

  @Output() submitResetFilter = new EventEmitter<any>();
  @Output() exitResetFilter = new EventEmitter();

  tracks: TRACK[];
  trackFilter: { name: string, isChecked: boolean }[];
  user: USER;

  constructor(private genService: GeneralService,
              private trackService: TrackService,
              private userService: UserService) { }

  ngOnInit() {
    this.trackService.getTracks().subscribe(res => {
      if (res) {
        this.tracks = res;
        this.genService.getUser().then(res => {
          this.user = res;
          this.trackFilter = [...res.trackFilter];
          if (this.trackFilter.length !== this.tracks.length) {
            this.tracks.forEach(track => {
              if (!this.trackFilter.find(tf => tf.name === track.name)) {
                this.trackFilter.push({ name: track.name, isChecked: false });
              }
            });
          }
        });
      }  
    });
  }

  onClick(i) {
    this.trackFilter[i].isChecked = !this.trackFilter[i].isChecked;
  }

  onAction(value) {
    this.trackFilter.forEach(track => track.isChecked = value);
  }

  onSubmit() {
    const excludeTracks = []
    this.trackFilter.forEach(track => {
      if (!track.isChecked) {
        excludeTracks.push(track.name);
      }
    });

    this.user.trackFilter = this.trackFilter;
    this.genService.setUser(this.user).then(res => {
      this.userService.updateUser(this.user);
    });

    this.submitResetFilter.emit(excludeTracks);
  }

  onExit() {
    this.exitResetFilter.emit();
  }
}
