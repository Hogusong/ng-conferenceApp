import { Injectable } from '@angular/core';
import { USER, PERIOD } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() {}

  setUser(user: USER) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Promise<USER> {
    return JSON.parse(localStorage.getItem('user'))
  }

  isLoggedIn(): Promise<Boolean> {
    return JSON.parse(localStorage.getItem('loginStatus'));
  }

  login(user: USER): Promise<any> {
    localStorage.setItem('loginStatus', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify(user));
    return JSON.parse(localStorage.getItem('loginStatus'));
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
    return JSON.parse(localStorage.getItem('period'));
  }
}
