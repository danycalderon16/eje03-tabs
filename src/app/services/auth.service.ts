import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }
  public async googleAuth(): Promise<any> {
    return this.authLogin(new GoogleAuthProvider());
  }

  public authLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }


  public async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    this.user = data;
    return userRef.set(data, { merge: true });
  }

  public getCurrentUser(): User {
    return this.user;
  }

  public logOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth.signOut()
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  }
}
