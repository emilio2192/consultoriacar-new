import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  login = (email:string, password: string) => {
    
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout = () => this.afAuth.signOut();

  resetPassword = (email:string) => this.afAuth.sendPasswordResetEmail(email).then(res => true).catch(error => false);
  
  createUser = async (email:string, password:string, role:string, name:string) => {
    try {
      const authUser = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if(authUser && authUser.user?.uid){
        const userDB = await this.db.collection('/users').add({
          uid: authUser.user.uid,
          name,
          email,
          admin: role=="admin"? true : false
        });
        if(userDB) return true;
        throw new Error('Cannot create new user');
      }
      throw new Error('Cannot create new user');
    } catch (error) {
      return false;
    }
  }
}
