import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() selected: string ;
  selectedColor = 'orange';

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
