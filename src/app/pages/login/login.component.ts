import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { USER } from 'src/app/models';
import { UserService } from 'src/app/providers/user.service';
import { GeneralService } from 'src/app/providers/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('LoginForm') LoginForm: NgForm;
  users: USER[];
  notFound = false;

  constructor(private userService: UserService,
              private genService: GeneralService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => this.users = res);
  }

  foundUser() {
    if (this.LoginForm.value.LoginData.username) {
      const data = this.LoginForm.value.LoginData.username
      if (data.includes('@')) {
        return this.users.find(user => user.email.toLowerCase() === data.toLowerCase());
      } else {
        return this.users.find(user => user.username.toLowerCase() === data.toLowerCase());
      }
    }
    return false;
  }

  onSubmit(form: NgForm) {
    const username = form.value.LoginData.username.trim().toLowerCase();
    const password = form.value.LoginData.password.trim();
    const user = this.users.find(user => user.username.toLowerCase() === username)
    if (user && user.password === password) {
      this.genService.login(user).then(res => {
        if (res) {
          if (user.seenTutorial) {
            this.router.navigate(['schedule']);
          } else {
            this.router.navigate(['tutorial']);
          }
        }
      })
    } else {
      this.notFound = true;
      setTimeout(() => {
        this.notFound = false;
      }, 3000);
    }
  }
}
