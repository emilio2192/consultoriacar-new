import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Case } from 'app/store/interfaces/cases.interface';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<any>;
  casesCollection!: AngularFirestoreCollection<Case>;
  constructor(public db: AngularFirestore) {
    this.usersCollection = db.collection('/users')
    this.casesCollection = db.collection<Case>('/cases');

  }

  getUsers = () => {
    return this.usersCollection.valueChanges();
  } 

  getUser = async (uid: string) => {
    const query = await this.usersCollection.ref.where('uid', '==', uid).limit(1).get();
    return query.docs.map(item => {
      return item.data()
    })[0]
  }

  getFilterCases = (client?:string) => {
    if(!client){
      // return this.casesCollection.valueChanges();
      return this.db.collection('/cases', ref => {
        return ref.where('isFinish', '==', false);
      }).valueChanges()
    }
    return this.db.collection('/cases', ref => {
      return ref.where('client', '==', client).where('isFinish', '==', false);
    }).valueChanges();
  }
}
