import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() confirmMessage: string;
  @Input() confirmTitle: string;
  @Output() confirm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  getConfirm(result) {
    this.confirm.emit(result);
  }
}
