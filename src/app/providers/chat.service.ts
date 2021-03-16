import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ChatService {  

  private itemsCollection!: AngularFirestoreCollection;
  
  public chats: any[] = [];

  constructor(
      private afs: AngularFirestore      
    ) { }

  addMessage() {
    this.itemsCollection = this.afs.collection<any>('chats');

    return this.itemsCollection.valueChanges();
  }
}