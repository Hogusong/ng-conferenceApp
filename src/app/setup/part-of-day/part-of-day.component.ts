import { Component, OnInit } from '@angular/core';
import { PARTOFDAY } from 'src/app/models';
import { GeneralService } from 'src/app/providers/general.service';

@Component({
  selector: 'app-part-of-day',
  templateUrl: './part-of-day.component.html',
  styleUrls: ['./part-of-day.component.css']
})
export class PartOfDayComponent implements OnInit {

  PODs: PARTOFDAY[];
  selectedPOD: PARTOFDAY;
  newPODs: PARTOFDAY[] = [];
  description = ''; 
  timeFrom = '00:00';
  timeTo = '00:01';

  makeNewPOD = false;
  avtivateChange = false;
  activateConfirm = false;
  currentName = '';
  errMessage = '';

  constructor(private genService: GeneralService) { }

  ngOnInit() {
    this.genService.getPartsOfDay().subscribe(res => this.PODs = res);
  }

  onMakeNewPOD() {
    this.makeNewPOD = true;
    this.newPODs = [];
  }

  addToNewPODs() {
    this.errMessage = '';
    this.description = this.description.trim();
    if (this.description.length < 1) {
      this.errMessage = "Not allowed to add without description."
    } else if (this.timeFrom >= this.timeTo) {
      this.errMessage = "Invalid time. 'To' is earlier than 'From'!"
    } else {
      const newPOD = { 
        indexKey: this.newPODs.length + 1,
        name: this.description, 
        timeFrom: this.timeFrom, 
        timeTo: this.timeTo }
      this.newPODs.push(newPOD);
      if (this.timeTo === '23:59') {
        this.activateConfirm = true;
      } else {
        this.description = '';
        this.timeFrom = this.genService.addMinute(this.timeTo);
        this.timeTo = this.genService.addMinute(this.timeFrom);
      }
    }
  }

  getConfirm(answer) {
    if (answer == true) {
      this.PODs.forEach(pod => this.genService.removePartOfDay(pod));
      setTimeout(() => {
        this.newPODs.forEach(pod => this.genService.addPartOfDay(pod));
      }, 500)
    }
    this.makeNewPOD = false;
    this.activateConfirm = false;
  }

  onEditDescription(pod: PARTOFDAY) {
    this.avtivateChange = true;
    this.currentName = pod.name;
    this.selectedPOD = pod;
  }

  submitChangeResult(data: any) {
    if (data) {
      if (this.PODs.find(pod => pod.name === data)) {
        this.errMessage = 'Description is not valid to use!'
      } else {
        this.selectedPOD.name = data;
        this.genService.updatePartOfDay(this.selectedPOD);
        this.avtivateChange = false;
      }
    } else {
      this.avtivateChange = false;
    }
  }
}
