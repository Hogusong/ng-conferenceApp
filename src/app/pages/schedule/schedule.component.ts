import { Component, OnInit } from '@angular/core';

import { GeneralService } from 'src/app/providers/general.service';
import { PARTOFDAY, SESSION, USER } from 'src/app/models';
import { SessionService } from 'src/app/providers/session.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  openScheduleList = true;
  openSelectTrack = false;
  openResetFilter = false;
  activeFabs1 = false;
  activeFabs2 = false;
  openPeriod = false;
  dateFrom: string = '2019-01-01';
  dateTo: string = '2019-02-28';
  queryText = '';

  segment = '';
  excludeTracks: any[] = [];
  partsOfDay: PARTOFDAY[];
  sessions: SESSION[];
  schedule: {
    date: string,
    groups: {
      indexKey: number,
      partOfDay: string,
      sessions: any[],
      count?: number
    }[]
  }[] = [];
  user: USER;

  constructor(private genService: GeneralService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.genService.getPeriod().then(period => {
      if (period) {
        this.dateFrom = period.dateFrom;
        this.dateTo = period.dateTo;
        this.updateSchedule();
      } else {
        this.openPeriod = true;
      }
    });
  }

  updateSchedule() {
    this.schedule = [];
    this.genService.getUser().then(user => {
      if (user) {
        user.trackFilter.forEach(track => {
          if (!track.isChecked) { this.excludeTracks.push(track.name) }
        });
        this.user = user;
        this.genService.getPartsOfDay().subscribe(res => this.partsOfDay = res);
        this.sessionService.getSessionsInPeriod(this.dateFrom, this.dateTo)
          .subscribe(res => {
            this.sessions = res;
            this.buildSchedule()
          })
      }
    })
  }

  buildSchedule() {
    const filterOption = this.getFilterOption();
    this.sessions.forEach(session => {
      session = this.sessionService.filterSession(session, filterOption);
      const partOfDay = this.partsOfDay.find(part => {
        return part.timeFrom <= session.timeStart && part.timeTo >= session.timeStart
      });
      const newGroup = {
        indexKey: partOfDay.indexKey,
        partOfDay: partOfDay.name,
        sessions: [session]
      };
      newGroup['count'] = newGroup['sessions'].length
      const newItem = { date: session.date, groups: [newGroup]};

      const sIndex = this.schedule.findIndex(item => item.date === session.date);
      if (sIndex < 0) {
        this.schedule.push(newItem);
      } else {
        const gIndex = this.schedule[sIndex].groups.findIndex(
          group => group.partOfDay === partOfDay.name
        );
        if (gIndex < 0) {
          this.schedule[sIndex].groups.push(newGroup);
        } else {
          this.schedule[sIndex].groups[gIndex].sessions.push(session);
        }
      }
    });

    this.schedule.sort((a, b) => {
      if (a.date > b.date) { return 1; }
      return -1;
    });
    this.schedule.forEach(item => {
      item.groups.sort((a, b) => a.indexKey - b.indexKey);
      item.groups.forEach(group => {
        group.sessions.sort((a, b) => {
          if (a.timeStart > b.timeStart) { return 1; }
          return -1;
        });
      });
    });
  }

  getFilterOption() {
    return {
      queryText: this.queryText.toLowerCase().trim(),
      segment: this.segment,
      excludeTracks: this.excludeTracks
    };
  }

  clearQueryText() {
    this.queryText = '';
    this.upDateFilter();
  }

  upDateFilter() {
    const filterOption = this.getFilterOption();
    this.schedule.forEach(daily => {
      daily.groups.forEach(group => {
        let count = 0
        group.sessions.forEach(session => {
          session = this.sessionService.filterSession(session, filterOption);
          if (!session.hide) { count ++ }
        });
        group.count = count
      });
    });
  }

  processByOption(option) {
    this.segment = option;
    if (this.segment === 'one') {
      this.openScheduleList = false;
      this.openSelectTrack = true;
    } else if (this.segment === 'all') {
      this.excludeTracks = [];
      this.upDateFilter();
    } else if (this.segment === 'favorites') {
      this.upDateFilter();
    } else if (this.segment === 'filter') {
      this.openScheduleList = false;
      this.openResetFilter = true;
    }
  }

  resetFilter(data) {
    this.excludeTracks = data;
    this.upDateFilter();
    this.closeResetFilter();
  }

  closeResetFilter() {
    this.openScheduleList = true;
    this.openResetFilter = false;
  }

  getOneTrack(data) {
    this.excludeTracks = data;
    this.segment = 'user';
    this.upDateFilter();
    this.closeSelectTrack();
  }

  closeSelectTrack() {
    this.openScheduleList = true;
    this.openSelectTrack = false;
  }

  getNewPeriod(period) {
    this.activeFabs1 = false;
    this.genService.setPeriod(period);
    this.dateFrom = period.dateFrom;
    this.dateTo = period.dateTo;
    this.openPeriod = false;
    this.updateSchedule();
  }

  closePeriod() {
    this.activeFabs1 = false;
    this.openPeriod = false;
  }
}
