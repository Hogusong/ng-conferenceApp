import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore }   from 'angularfire2/firestore';

import { USER, PERIOD, PARTOFDAY, MAP } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  partsOfDayCollection: AngularFirestoreCollection<PARTOFDAY>;
  partOfDayDoc: AngularFirestoreDocument<PARTOFDAY>;

  mapsCollection: AngularFirestoreCollection<MAP>;
  maps: Observable<MAP[]>;

  constructor(private db: AngularFirestore) {
    this.partsOfDayCollection = this.db.collection(
      'partOfDay', ref => ref.orderBy('indexKey', 'asc'));
    this.mapsCollection = this.db.collection(
      'maps', ref => ref.orderBy('name', 'asc'));
  }

  getPartsOfDay(): Observable<PARTOFDAY[]> {
    return this.partsOfDayCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const data = action.payload.doc.data() as PARTOFDAY;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  addPartOfDay(pod: PARTOFDAY) {
    return this.partsOfDayCollection.add(pod);
  }

  updatePartOfDay(pod: PARTOFDAY) {
    const id = pod.id;
    delete(pod.id);
    this.partOfDayDoc = this.db.doc(`partOfDay/${id}`);
    this.partOfDayDoc.update(pod);
    pod.id = id;
  }

  removePartOfDay(pod: PARTOFDAY) {
    this.partOfDayDoc = this.db.doc(`partOfDay/${pod.id}`)
    this.partOfDayDoc.delete();
  }

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

  isValidEmail(data) {
    if (data) {
      if (!data.includes('@')) { return false;  } 
      if (!data.includes('.')) { return false;  } 

      const indexAt = data.indexOf('@');
      if (data.indexOf('@', indexAt+1) > -1) { return false;  }

      let count = 0;
      for (let i=indexAt; i < data.length ; i++) {
        if (data[i] === '.' && i > indexAt) { count ++ }
      };
      return count === 1;
    }
    return true;
  }

  getMap() {
    this.maps = this.mapsCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const data = action.payload.doc.data() as MAP;
          return data;
        });
      }));
      return this.maps ;
  }

  getDateFormat(date?: Date) {
    if (!date) {
      date = new Date();
    }
    const dateArray = date.toLocaleDateString().split('/');
    return dateArray[2] + '-' +
           this.get2DigitString(+dateArray[0]) + '-' +
           this.get2DigitString(+dateArray[1]);
  }

  get2DigitString(num: number): string {
    return (num < 10) ? '0' + num : '' + num ;   
  }

  addMinute(time: string): string {
    const [h, m] = time.split(':');
    const hour = this.get2DigitString((m === '59') ? +h + 1 : +h);
    const min = this.get2DigitString((m === '59') ? 0 : +m + 1);
    return (hour === '24') ? null : hour + ':' + min ;
  }
}
