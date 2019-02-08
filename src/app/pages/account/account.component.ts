import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user.service';
import { GeneralService } from 'src/app/providers/general.service';
import { Router } from '@angular/router';
import { USER } from 'src/app/models';

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
  currPass = '';
  firstPass = '';
  secondPass = '';
  errMessage = '';

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
      this.userService.getUserById(res.id).then(res => {
        this.user = res;
      });
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

  updateAvatar() {
    this.resetBtns(true);
    this.hideImageBtn = false;
    this.uploadImage = true;
  }

  resetBtns(value: boolean) {
    this.hideNameBtn = value;
    this.hideEmailBtn = value;
    this.hidePasswordBtn = value;
    this.hideImageBtn = value;
    this.showInput = value;
    this.errMessage = ''
  }

  onExit() {
    this.resetBtns(false);
    this.uploadImage = false;
  }

  onSubmit() {
    if (!this.hideNameBtn) { this.processUsername() }
    else if (!this.hideEmailBtn) { this.processEmail() }
    else if (!this.hidePasswordBtn) { this.processPassword() }
  }

  processUsername() {
    this.username = this.username.trim();
    if (this.username.length < 3) {
      this.errMessage = 'More than 2 letters are requuired.'
    } else {
      const idx = this.users.findIndex(user => user.username.toLowerCase() === this.username.toLowerCase());
      if (idx > -1) {
        this.errMessage = 'This name was used already.'
      } else {
        this.user.username = this.username;
        this.updateUser(this.user);
      }
    }
    if (this.errMessage) { setTimeout(() => { this.errMessage = '' }, 3000); }
  }

  processEmail() {
    this.email = this.email.trim();
    if (!this.genService.isValidEmail(this.email)) {
      this.errMessage = "This email is not valid.";
    } else {
      const idx = this.users.findIndex(user => user.email.toLowerCase() === this.email.toLowerCase());
      if (idx > -1) {
        this.errMessage = 'This email was used already.';
      } else {
        this.user.email = this.email;
        this.updateUser(this.user);
      }
    }
    if (this.errMessage) { setTimeout(() => { this.errMessage = '' }, 3000); }
  }

  processPassword() {
    this.currPass = this.currPass.trim();
    this.firstPass = this.firstPass.trim();
    this.secondPass = this.secondPass.trim();
    if (this.firstPass.length < 4 || this.secondPass.length < 4) {
      this.errMessage = 'Password should be more than 3 letters. Try again.'
    } else if (this.firstPass !== this.secondPass) {
      this.errMessage = 'Two passwords are not matched. Try again.';
    } else if (this.currPass !== this.user.password) {
      this.errMessage = 'Wrong current password. Try another.';
    } else {
      this.user.password = this.firstPass;
      this.updateUser(this.user);
    }
    if (this.errMessage) { setTimeout(() => { this.errMessage = '' }, 3000); }
  }

  updateUser(user: USER) {
    const target = this.users.find(u => u.id === user.id);
    if (target) { user.avatar = target.avatar; }
    this.userService.updateUser(user);
    this.genService.setUser(user).then(res => {
      this.userService.getUserById(user.id).then(res => this.user = res);
    });
    this.resetBtns(false);
  }

  updatePicture(path: string) {
    const oldUrl = this.user.avatar;
    const id = this.user.id;

    this.resetBtns(false);
    this.uploadImage = false;

    this.user.avatar = path;
    this.genService.setUser(this.user).then(() => {
      this.userService.updateUser(this.user);
    });

    // this.user = null;
    this.userService.getUserById(id).then(data => { this.user = data; });
    this.userService.deleteUrl(oldUrl);
  }
}
