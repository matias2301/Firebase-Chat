import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {  

  private itemsCollection!: AngularFirestoreCollection<Message>;
  
  public chats: Message[] = [];
  public user: any = {};

  constructor(
      private afs: AngularFirestore,
      public auth: AngularFireAuth      
    ) {
      this.auth.authState.subscribe( user => {
        
        if( !user ) return;
        console.log(user);
        this.user.name = user.displayName || 'User';
        this.user.uid = user.uid;
      });
    }

  
  login( provider: string ) {

    if( provider === 'google') {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
  }
  logout() {
    this.user = {};
    this.auth.signOut();
  }

  loadMessage() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref
                                                                .orderBy('date', 'asc')
                                                                .limitToLast(10) );

    return this.itemsCollection.valueChanges()
      .pipe(
        map ((messages: Message[]) => {        
          this.chats = messages;
        })
      );
  }

  addMessage( text:string ) {
    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid,
    }

    return this.itemsCollection.add( message );
  }

}