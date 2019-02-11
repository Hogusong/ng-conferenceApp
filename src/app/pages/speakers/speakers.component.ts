import { Component, OnInit } from '@angular/core';
import { SpeakerService } from 'src/app/providers/speaker.service';
import { SPEAKER } from 'src/app/models';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit {

  speakers: SPEAKER[]=[];
  speaker: SPEAKER;
  queryText = '';
  showDetail = false;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit() {
    this.speakerService.getSpeakers().subscribe(res => this.speakers = res);
  }

  openDetail(speaker) {
    this.speaker = speaker;
    this.showDetail = true;
  }
}
