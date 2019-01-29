import { Component, OnInit } from '@angular/core';
import { GeneralService } from './providers/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  loggedIn: boolean;

  constructor(private genService: GeneralService,
              private router: Router) {}

  ngOnInit() {
    this.genService.isLoggedIn().then(res => {
      if (res) {
        this.loggedIn = res;
        this.router.navigate(['schedule']);
      } else {
        this.router.navigate(['home']);
      }
    })    
  }
}
