import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent {

  @Output() submitResult = new EventEmitter<any>();
  
  @Input() title: string;
  @Input() description: string;
  @Input() isNew: boolean;
  @Input() currentName: string;
  @Input() errMessage: string;

  newInfo = '';
}
