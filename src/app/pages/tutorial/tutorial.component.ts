import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/providers/general.service';
import { UserService } from 'src/app/providers/user.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  curr_page = 1
  swipeCoord?: [number, number];
  swipeTime?: number;

  disableSwiping = false;

  constructor(private router: Router,
              private userService: UserService,
              private genService: GeneralService) { }

  ngOnInit() {}

  moveSlider(x) {
    this.curr_page += x; 
    this.curr_page = this.curr_page < 1 ? 1 : this.curr_page;
    this.curr_page = this.curr_page > 4 ? 4 : this.curr_page;
  }

  onSwipe(e: TouchEvent, when: string): void {
    if (this.disableSwiping === true) {
      return;
    }
    
    const indexDirection = this.swipe(e, when);
    // handle a failed swipe
    if (indexDirection === 0) {
      return;
    }
    else {
      this.moveSlider(indexDirection);
    }
  }

  /**
   * @param {TouchEvent} e
   * @param {string} when
   * @returns {number}
   * @description detect the direction of the swipe, and return a -1 or 1 if the duration is long enough
   *              else return a 0 to do nothing
   */
  swipe(e: TouchEvent, when: string): number {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    }

    else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 // Short enough
        && Math.abs(direction[1]) < Math.abs(direction[0]) // Horizontal enough
        && Math.abs(direction[0]) > 30) {  // Long enough
        return direction[0] < 0 ? 1 : -1;
      }
    }

    return 0;
  }

  skipTutorial() {
    this.genService.isLoggedIn().then(res => {
      if (res) {
        this.router.navigate(['schedule']);
      } else {
        this.router.navigate(['home']);
      }
    })
  }

  startApp() {
    this.genService.isLoggedIn().then(res => {
      if (res) {
        this.genService.getUser().then(user => {
          if (!user.seenTutorial) {
            user.seenTutorial = true;
          }
          this.genService.setUser(user).then(res => {
            this.userService.updateUser(user)
            this.router.navigate(['/schedule']);
          });
        })
      } else {
        this.router.navigate(['home']);
      }
    })
  }
}
