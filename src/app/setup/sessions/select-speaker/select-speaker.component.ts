import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpeakerService } from 'src/app/providers/speaker.service';

@Component({
  selector: 'app-select-speaker',
  templateUrl: './select-speaker.component.html',
  styleUrls: ['./select-speaker.component.css']
})
export class SelectSpeakerComponent implements OnInit {

  @Input() ids: string[];
  @Output() submitSpeakers = new EventEmitter<string[]>();
  @Output() exitSelection = new EventEmitter();
  speakers: {
    id: string, name: string, phone: string, isChecked: boolean
  }[] = [];

  constructor(private speakerService: SpeakerService) { }

  ngOnInit() {
    this.speakerService.getSpeakers().subscribe(res => {
      res.forEach(s => {
        this.speakers.push({
          id: s.id,  name: s.name,  phone: s.phone, isChecked: this.isSelected(s.id)
        })
      })
    })
  }

  onClick(index) {
    this.speakers[index].isChecked = !this.speakers[index].isChecked
  }

  isSelected(key) {
    if (this.ids.find(id => id === key)) {  return true }
    return false;
  }

  onCheckAction(res) {
    this.speakers.forEach(s => s.isChecked = res);
  }

  onSubmit() {
    const data = [];
    this.speakers.forEach(s => {
      if (s.isChecked) {
        data.push(s.id);
      }
    })
    this.submitSpeakers.emit(data);
  }

  onExit() {
    this.exitSelection.emit();
  }
}
