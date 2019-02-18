import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PERIOD } from 'src/app/models';
import { GeneralService } from 'src/app/providers/general.service';

@Component({
  selector: 'app-setup-period',
  templateUrl: './setup-period.component.html',
  styleUrls: ['./setup-period.component.css'],
})
export class SetupPeriodComponent implements OnInit {

  @ViewChild('PeriodForm') PeriodForm: NgForm;
  @Input() dateFrom: string;
  @Input() dateTo: string;
  @Output() submitPeriod = new EventEmitter<PERIOD>();
  @Output() exitPeriod = new EventEmitter();

  constructor(private genService: GeneralService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.PeriodForm) {
        this.PeriodForm.setValue({ 
          PeriodData: { from: this.dateFrom, to: this.dateTo }
        });
      }  
    }, 300);
  }

  isValidDate() {
    if (this.PeriodForm.value.PeriodData) {
      this.dateFrom = this.PeriodForm.value.PeriodData.from;
      this.dateTo = this.PeriodForm.value.PeriodData.to;
      return this.dateFrom <= this.dateTo;
    }
    return false;
  }

  onSubmit() {
    if (this.dateFrom <= this.dateTo) {
      const period: PERIOD = {
        dateFrom: this.dateFrom, dateTo: this.dateTo}
      this.genService.setPeriod(period);
      this.submitPeriod.emit(period);
    }
  }

  onExit() {
    this.exitPeriod.emit();
  }
}
