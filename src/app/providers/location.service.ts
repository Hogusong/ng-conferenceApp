import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOCATION } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationsCollection: AngularFirestoreCollection<LOCATION>;
  locationDoc: AngularFirestoreDocument<LOCATION>;
    
  constructor(private db: AngularFirestore) {
    this.locationsCollection = this.db.collection(
      'locations', ref => ref.orderBy('name', 'asc'));
  }

  getLocations(): Observable<LOCATION[]> {
    return this.locationsCollection.snapshotChanges()
      .pipe(map(response => {
        return response.map(action => {
          const data = action.payload.doc.data() as LOCATION;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getLocationById(id: string): Promise<any> {
    return this.locationsCollection.doc(id).ref.get()
      .then(doc => {
        const location = doc.data() as LOCATION ;
        location.id = id;
        return location;
      });
  }

  addLocation(location: LOCATION) {
    this.locationsCollection.add(location);
  }

  updateLocation(location: LOCATION) {
    const id = location.id;
    delete(location.id);
    this.locationDoc = this.db.doc(`locations/${id}`);
    this.locationDoc.update(location);
    location.id = id;
  }

  removeLocation(location: LOCATION) {
    this.locationDoc = this.db.doc(`locations/${location.id}`);
    this.locationDoc.delete();
  }
}
