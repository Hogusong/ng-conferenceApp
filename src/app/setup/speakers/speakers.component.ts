import { Component, OnInit } from '@angular/core';
import { SPEAKER } from 'src/app/models';
import { SpeakerService } from 'src/app/providers/speaker.service';
import { SessionService } from 'src/app/providers/session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit {

  speakers: SPEAKER[];
  selectedSpeaker: SPEAKER;
  queryText = '';
  openUploadAvatar = false;
  activateConfirm = false;
  confirmMessage = '';
  confirmTitle = '';

  constructor(private speakerService: SpeakerService,
              private sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.speakerService.getSpeakers().subscribe(res => this.speakers = res);
  }

  onEditSpeaker(type: string) {
    this.router.navigate(['edit', type], { relativeTo: this.activatedRoute });
  }

  onRemoveSpeaker(speaker: SPEAKER) {
    this.activateConfirm = true;
    this.selectedSpeaker = speaker;
    this.confirmMessage = 'Are you sure to delete this session?';
    this.confirmTitle = speaker.name;
  }

  getConfirm(result) {
    if (result) {
      this.speakerService.removeSpeaker(this.selectedSpeaker);
      this.sessionService.removeSpeakerInSession(this.selectedSpeaker.id);
    }
    this.activateConfirm = false;
    this.selectedSpeaker = null;
  }
}
