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
  }
}
