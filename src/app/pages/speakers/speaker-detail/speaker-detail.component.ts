import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SPEAKER } from 'src/app/models';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.css']
})
export class SpeakerDetailComponent implements OnInit {

  @Input() speaker: SPEAKER;
  @Output() closeDetail = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onExit() {
    this.closeDetail.emit();
  }
}
