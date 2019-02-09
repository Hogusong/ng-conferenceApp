import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SESSION } from '../models';
import { GeneralService } from './general.service';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionsCollection: AngularFirestoreCollection<SESSION> ;
  sessionDoc: AngularFirestoreDocument<SESSION> ;

  constructor(private db: AngularFirestore,
              private genService: GeneralService) {}

  getSessionsInPeriod(start, end): Observable<SESSION[]> {
    this.sessionsCollection = this.db.collection(
      'sessions', ref => ref.where('date', '>=', start)
                            .where('date', '<=', end)
                            .orderBy('date', 'asc'));
    const sessions = this.sessionsCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const data = action.payload.doc.data() as SESSION;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
    return sessions;
  }

  filterSession(session: any, options: any) {
    let matchesQueryText = false;
    if (options.queryText.length > 0) {
      // of any query word is in the session name than it passes the query test
      if (session.name.toLowerCase().indexOf(options.queryText) > -1) {
        matchesQueryText = true;
      }
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (options.excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (options.segment === 'favorites') {
      this.genService.getUser().then(user => {
        matchesSegment = (user.favorites.findIndex(f => f.name === session.name) > -1);
        // all tests must be true if it should not be hidden
        session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
      });
    } else {
      // doesn't matter about favorites.
      session.hide = !(matchesQueryText && matchesTracks);
    }
    return session;
  }

}
