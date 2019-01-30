import { Injectable } from '@angular/core';
import { USER, PERIOD } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() {}

  setUser(user: USER): Promise<any> {
    const promise = new Promise((res, rej) => {
      localStorage.setItem('user', JSON.stringify(user));
      res(true)
    });
    return promise;
  }

  getUser(): Promise<any> {
    const promise = new Promise((res, rej) => {
      const user = JSON.parse(localStorage.getItem('user'));
      res(user);
    });
    return promise;
  }

  isLoggedIn(): Promise<any> {
    const promise = new Promise((res, rej) => {
      const loggedIn = JSON.parse(localStorage.getItem('loginStatus'));
      res(loggedIn);
    })
    return promise;
  }

  login(user: USER): Promise<any> {
    localStorage.setItem('loginStatus', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify(user));
    return this.isLoggedIn();
  }

  signup(user: USER): Promise<any> {
    return this.login(user);
  }

  logout() {
    localStorage.setItem('loginStatus', JSON.stringify(false));
    localStorage.setItem('user', JSON.stringify(null));
  }

  setPeriod(period: PERIOD) {
    localStorage.setItem('period', JSON.stringify(period));
  }

  getPeriod(): Promise<any> {
    const promise = new Promise((res, rej) => {
      const period = JSON.parse(localStorage.getItem('period'));
      res(period);
    })
    return promise;
  }
}
