import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  traschNotes: Note[] = [];
  normalNotes: Note[] = [];

  items$;
  firestore = inject(Firestore);

  constructor() { 
    this.items$ = collectionData(this.getNotesRef());
  }
    getNotesRef(){
      return collection(this.firestore, 'notes');
    }

    getTrashRef(){
      return collection(this.firestore, 'trash');
    }

    // getSingelDocRef(colID:String, docId:String){
    //   return doc(collection(this.firestore, colID), docID)
    // }
  
}
