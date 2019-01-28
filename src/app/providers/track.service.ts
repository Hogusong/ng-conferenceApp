import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TRACK } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  tracksCollection: AngularFirestoreCollection<TRACK>;
  trackDoc: AngularFirestoreDocument<TRACK>;
    
  constructor(private db: AngularFirestore,
              private userService: UserService) {
    this.tracksCollection = this.db.collection(
      'tracks', ref => ref.orderBy('name', 'asc'));
  }

  getTracks(): Observable<TRACK[]> {
    return this.tracksCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const data = action.payload.doc.data() as TRACK;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  addTrack(track: TRACK) {
    this.tracksCollection.add(track);
  }

  updateTrack(track: TRACK) {
    const id = track.id;
    delete(track.id);
    this.trackDoc = this.db.doc(`tracks/${id}`);
    this.trackDoc.update(track);
    track.id = id;
  }

  removeTrack(track: TRACK) {
    this.trackDoc = this.db.doc(`tracks/${track.id}`);
    this.trackDoc.delete();
  }
}
