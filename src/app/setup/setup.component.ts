import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../providers/general.service';

@Component({
  selector: 'app-setup',
  template: `<router-outlet></router-outlet>`
})
export class SetupComponent implements OnInit {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private genService: GeneralService) {}

  ngOnInit() {
    if (this.genService.isLoggedIn()) {
      this.genService.getUser().then(user => {
        if (user && user.username.toLowerCase() === 'admin') {
          this.router.navigate(['sessions'], { relativeTo: this.activatedRoute });
        }
      })
    } else {
      this.router.navigate(['/schedule']);
    }
  }
}
