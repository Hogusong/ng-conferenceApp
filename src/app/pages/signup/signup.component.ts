import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/providers/user.service';
import { USER, TRACK } from 'src/app/models';
import { GeneralService } from 'src/app/providers/general.service';
import { TrackService } from 'src/app/providers/track.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('SignupForm') SignupForm: NgForm;
  users: USER[];
  trackFilter: { name: string, isChecked: boolean }[] = [];
  pattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
  username = '';
  email = '';
  password = '';
  confirmPW = '';
  submitted = false;

  constructor(private userService: UserService,
              private genService: GeneralService,
              private trackService: TrackService,
              private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(res => this.users = res);
    this.trackService.getTracks().subscribe(tracks => {
      tracks.forEach(track => {
        this.trackFilter.push({ name: track.name, isChecked: true });
      })
    });
  }

  suggestUserInfo() {
    // set all values
    this.SignupForm.setValue({
      userData: { 
        username: '',
        email: '',
        password: '',
        confirmPW: '' 
      },
    });

    // patch some values
    this.SignupForm.form.patchValue({
      userData: { 
        username: '',
        email: ''
      }
    })
  }

  isThisUsed(data) {
    if (data) {
      if (data.includes('@')) {
        return this.users.find(user => user.email.toLowerCase() === data.toLowerCase());
      } else {
        return this.users.find(user => user.username.toLowerCase() === data.toLowerCase());
      }
    }
    return false;
  }

  isValidEmail(data) {
    return this.genService.isValidEmail(data);
  }

  notEnoughLength(data) {
    if (data) {
      return data.trim().length < 4
    }
    return false ;
  }

  passwordsNotMatched() {
    if (this.SignupForm.value.userData) {
      return this.SignupForm.value.userData.password !== this.SignupForm.value.userData.confirmPW;
    }
    return false
  }

  onSubmit() {
    this.submitted = true;
    this.username = this.SignupForm.value.userData.username.trim();
    this.email = this.SignupForm.value.userData.email.trim();
    this.password = this.SignupForm.value.userData.password.trim();
    const user: USER = {
      username: this.username,
      email: this.email,
      password: this.password,
      favorites: [],
      trackFilter: this.trackFilter,
      seenTutorial: false
    };
    this.SignupForm.reset();
    this.userService.addUser(user).then(res => {
      user.id = res.id;
      this.genService.signup(user).then(res => {
        if (res === true) {
          console.log(user)
          this.router.navigate(['tutorial']);
        } else {
          this.router.navigate(['home']);
        }
      })
    })
  }

  onExit() {
    this.router.navigate(['home']);
  }
}
