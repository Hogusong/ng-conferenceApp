import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-setup-tabs',
  templateUrl: './setup-tabs.component.html',
  styleUrls: ['./setup-tabs.component.css']
})
export class SetupTabsComponent {

  @Input() selected: string ;
  selectedColor = 'orange';
  
}
