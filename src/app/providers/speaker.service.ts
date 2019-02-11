import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,
         AngularFirestoreDocument,
         AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SPEAKER } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  speakersCollection: AngularFirestoreCollection<SPEAKER>;
  speakerDoc: AngularFirestoreDocument<SPEAKER>;

  constructor(private db: AngularFirestore,
              private fireStorage: AngularFireStorage) {
    this.speakersCollection = this.db.collection(
      'speakers', ref => ref.orderBy('name', 'asc'));
  }

  getSpeakers(): Observable<SPEAKER[]> {
    return this.speakersCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const speaker = action.payload.doc.data() as SPEAKER;
          speaker.id = action.payload.doc.id;
          if (speaker.profilePic) {
            this.fireStorage.ref(speaker.profilePic).getDownloadURL().subscribe(url => {
              speaker.profilePic = url ? url : '';
            });
          }
          return speaker;
        });
      }));
  }
}
