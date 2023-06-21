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

  getFilterCases = (isFinish?:boolean, client?:string) => {

    return this.db.collection('/cases', ref => {
      let  reference = ref.where('isFinish', '==', isFinish);
      if(client){
        console.log('filtra', client);
        reference = ref.where('isFinish', '==', isFinish).where('client', '==', client);
      } 
      return reference;
    }).valueChanges();
  }
}
