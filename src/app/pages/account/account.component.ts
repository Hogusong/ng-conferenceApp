import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user.service';
import { GeneralService } from 'src/app/providers/general.service';
import { Router } from '@angular/router';
import { USER } from 'src/app/models';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  users: USER[] = [];
  user: USER;
  username = '';
  email = '';
  password = '';
  firstPass = '';
  secondPass = '';
  errMessage = '';
  avatar = '';
  uploadImage = false;
  hideNameBtn = false;
  hideEmailBtn = false;
  hidePasswordBtn = false;
  hideImageBtn = false;
  showInput = false;

  constructor(private userService: UserService,
              private genService: GeneralService,
              private router: Router) { }

  ngOnInit() {
    this.genService.getUser().then(res => {
      this.avatar = res.avatar;
      this.userService.getUserById(res.id).then(res => this.user = res);
    });
    this.userService.getUsers().subscribe(res => this.users = res);
  }

  updateUsername() {
    this.resetBtns(true);
    this.hideNameBtn = false
  }

  updateEmail() {
    this.resetBtns(true);
    this.hideEmailBtn = false
  }

  updatePassword() {
    this.resetBtns(true);
    this.hidePasswordBtn = false
  }

  updateImage() {
    this.resetBtns(true);
    this.hideImageBtn = false
  }

  resetBtns(value: boolean) {
    this.hideNameBtn = value;
    this.hideEmailBtn = value;
    this.hidePasswordBtn = value;
    this.hideImageBtn = value;
    this.showInput = value;
    this.errMessage = ''
  }

  onSubmit() {
    if (!this.hideNameBtn) { this.processUsername() }
    if (!this.hideEmailBtn) { this.processEmail() }
    if (!this.hidePasswordBtn) { this.processPassword() }
    if (!this.hideImageBtn) { this.processImage() }
  }

  processUsername() {
    this.username = this.username.trim();
    if (this.username.length < 3) {
      this.errMessage = 'More than 2 letters are requuired.'
    } else {
      const idx = this.users.findIndex(user => user.username.toLowerCase() === this.username.toLowerCase());
      if (idx > -1) {
        this.errMessage = 'This name is used already.'
      } else {
        this.user.username = this.username;
        this.updateUser(this.user);
      }
    }
  }

  processEmail() {

  }

  processPassword() {

  }

  processImage() {

  }

  updateUser(user: USER) {
    user.avatar = this.avatar;
    this.genService.setUser(user).then(res => {
      this.userService.updateUser(user);
      this.userService.getUserById(user.id).then(res => this.user = res);
    });
    this.resetBtns(false);
  }
}
