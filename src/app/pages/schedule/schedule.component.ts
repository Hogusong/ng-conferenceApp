import { Component, OnInit } from '@angular/core';

import { GeneralService } from 'src/app/providers/general.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  openDropdown = false;
  activeFabs1 = false;
  activeFabs2 = false;
  openPeriod = false;
  dateFrom: string = '2019-01-01';
  dateTo: string = '2019-02-28';

  constructor(private genService: GeneralService) {
  }

  ngOnInit() {
    this.genService.getPeriod().then(period => {
      this.dateFrom = period.dateFrom;
      this.dateTo = period.dateTo;  
    });
  }

  selected() {
    this.openDropdown = !this.openDropdown;
  }

  getNewPeriod(period) {
    this.activeFabs1 = false;
    this.genService.setPeriod(period);
    this.dateFrom = period.dateFrom;
    this.dateTo = period.dateTo;
    this.openPeriod = false;
  }

  closePeriod() {
    this.activeFabs1 = false;
    this.openPeriod = false;
  }
}
