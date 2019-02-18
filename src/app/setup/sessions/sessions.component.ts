import { Component, OnInit } from '@angular/core';
import { SESSION } from 'src/app/models';
import { SessionService } from 'src/app/providers/session.service';
import { GeneralService } from 'src/app/providers/general.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions: SESSION[];
  dateFrom: string = '2019-01-01';
  dateTo: string = '2019-02-28';
  queryText = '';
  openPeriod = false;
  showSessions = true;

  constructor(private sessionService: SessionService,
              private genService: GeneralService) { }

  ngOnInit() {
    this.genService.getPeriod().then(period => {
      if (period) {
        this.dateFrom = period.dateFrom;
        this.dateTo = period.dateTo;
        this.sessionService.getSessionsInPeriod(this.dateFrom, this.dateTo)
          .subscribe(res => {
            this.sessions = res;
          })
      } else {
        this.openPeriod = true;
      }
    });
  }

  onEditSession(type: string) {
    console.log(type);
  }

  onRemoveSession(id: string) {
    console.log('removed:', id);
  }
}
