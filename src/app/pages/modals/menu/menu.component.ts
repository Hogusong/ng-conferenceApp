import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/providers/general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  username = 'user';
  isLoggedIn = false;

  constructor(private genService: GeneralService,
              private router: Router) { }

  logout() {
    this.genService.logout();
    this.router.navigate(['home']);
  }

  navigate(url) {
    this.router.navigate([url]);
  }

}
