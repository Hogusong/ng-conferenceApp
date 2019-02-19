import { Component, OnInit } from '@angular/core';
import { SESSION } from 'src/app/models';
import { SessionService } from 'src/app/providers/session.service';
import { GeneralService } from 'src/app/providers/general.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions: SESSION[];
  selectedSession: SESSION;
  dateFrom: string = '2019-01-01';
  dateTo: string = '2019-02-28';
  queryText = '';
  openPeriod = false;
  activeFabs = false;
  activateConfirm = false;
  confirmTitle: string;
  confirmMessage: string;

  constructor(private sessionService: SessionService,
              private genService: GeneralService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.genService.getPeriod().then(period => {
      if (period) {
        this.getSession(period.dateFrom, period.dateTo);
      } else {
        this.openPeriod = true;
      }
    });
  }

  getSession(from, to) {
    this.dateFrom = from;
    this.dateTo = to;
    this.sessionService.getSessionsInPeriod(from, to)
    .subscribe(res => {
      this.sessions = res;
    })
  }

  onEditSession(type: string) {
    this.router.navigate(['edit', type], { relativeTo: this.activatedRoute });
  }

  onRemoveSession(session: SESSION) {
    this.activateConfirm = true;
    this.selectedSession = session;
    this.confirmMessage = 'Are you sure to delete this session?';
    this.confirmTitle = session.name;
  }

  getConfirm(result) {
    if (result) {
      this.sessionService.removeSession(this.selectedSession);
    }
    this.activateConfirm = false;
    this.selectedSession = null;
  }

  getNewPeriod(period) {
    this.openPeriod = false;
    this.activeFabs = false;
    this.getSession(period.dateFrom, period.dateTo);
  }
}
