import { Component, OnInit } from '@angular/core';
import { SPEAKER } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakerService } from 'src/app/providers/speaker.service';

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css']
})
export class SpeakerEditComponent implements OnInit {

  id ='';
  mode = '';
  speaker: SPEAKER = {
    name: '',
    profilePic: '',
    twitter: '',
    github: '',
    instagram: '',
    about: '',
    location: '',
    email: '',
    phone: '',
    sessions: []   // session id & name  
  };
  stringPath = '';
  uploadImage = false;

  constructor(private speakerService: SpeakerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.params['id'];
    if (this.mode !== 'New') {
      [this.id, this.mode] = [this.mode, 'Edit'];
      this.speakerService.getSpeakerById(this.id).then(res => {
        this.speaker = res.speaker;
        this.stringPath = res.path;
      });
    }
  }

  onUploadImage() {
    if (this.mode === 'Edit') {
      this.uploadImage = true;
    }
  }

  updatePicture(path: string) {
    const oldUrl = this.speaker.profilePic;
    this.uploadImage = false;
    this.speaker.profilePic = path;

    this.speakerService.updateSpeaker(this.speaker);
    this.speakerService.deleteUrl(oldUrl);
    this.onExit()
  }

  onSubmit() {
    if (this.mode === 'New') {
      this.speakerService.addSpeaker(this.speaker);
    } else {
      this.speaker.profilePic = this.stringPath;
      this.speakerService.updateSpeaker(this.speaker);
    }
    this.onExit();
  }

  onExit() {
    this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
  }
}
