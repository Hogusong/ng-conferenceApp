import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { USER } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<USER>;
  userDoc: AngularFirestoreDocument<USER>;

  constructor(private db: AngularFirestore,
              private fireStorage: AngularFireStorage) {
    this.usersCollection = this.db.collection(
      'users', ref => ref.orderBy('username', 'asc'));
  }

  getUsers(): Observable<USER[]> {
    return this.usersCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const data = action.payload.doc.data() as USER;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getUserById(id: string): Promise<USER> {
    return this.usersCollection.doc(id).ref.get()
      .then(doc => {
        const user = doc.data() as USER;
        user.id = id;
        if (user.avatar) {
          // download image from firebase storage.
          this.fireStorage.ref(user.avatar).getDownloadURL().subscribe(url => {
            user.avatar = url;
          });
        }
      return user;
    });
  }

  // return result including user's ID.
  addUser(user: USER): Promise<any> {
    return this.usersCollection.add(user);
  }

  updateUser(user: USER) {
    const id = user.id;
    delete(user.id);
    this.userDoc = this.db.doc(`users/${id}`);
    this.userDoc.update(user)
    user.id = id;
  }

  removeUser(user: USER) {
    this.userDoc = this.db.doc(`users/${user.id}`);
    this.userDoc.delete();
  }

  deleteUrl(oldUrl) {
    if (oldUrl) {
      this.fireStorage.storage.refFromURL(oldUrl).delete();
    }
  }

  addTrackInUser(name: string) {
    let data: USER[] = null;
    this.getUsers().subscribe(res => data = res);
    setTimeout(() => {
      const users = data.slice();
      users.forEach((user:USER) => {
        user.trackFilter.push({ name: name, isChecked: false });
        this.updateUser(user);
      });
    }, 1000);
  }

  updateTrackInUser(oldName, newName) {
    let data: USER[] = null;
    this.getUsers().subscribe(res => data = res);
    setTimeout(() => {
      const users = data.slice();
      users.forEach((user:USER) => {
        const index = user.trackFilter.findIndex(track => track.name === oldName);
        if (index > -1) {
          user.trackFilter[index].name = newName;
          this.updateUser(user);
        }
      });
    }, 1000);
  }

  removeTrackInUser(name) {
    let data: USER[] = null;
    this.getUsers().subscribe(res => data = res);
    setTimeout(() => {
      const users = data.slice();
      users.forEach((user:USER) => {
        const index = user.trackFilter.findIndex(track => track.name === name);
        if (index > -1) {
          user.trackFilter.splice(index, 1);
          this.updateUser(user);
        }
      });
    }, 1000);
  }
}
