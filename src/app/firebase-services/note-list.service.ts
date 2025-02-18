import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot} from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];


  unsubNotes;
  unsubTrash;

  firestore = inject(Firestore);

  constructor() { 
    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();
  }

  ngonDestroy(){
    this.unsubNotes();
    this.unsubTrash();
  }

  subTrashList(){
    return onSnapshot(this.getTrashRef(), (list) =>{
      this.trashNotes = [];
      list.forEach(element => {
      this.trashNotes.push(this.steNoteObject(element.data(), element.id))
    });
    });
  }


  subNotesList(){
    return onSnapshot(this.getNotesRef(), (list) =>{
      this.normalNotes = [];
      list.forEach(element => {
      this.normalNotes.push(this.steNoteObject(element.data(), element.id))
      });
      
    });
  }

  steNoteObject(obj: any, id: string): Note{
    return {
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }
  }


    getNotesRef(){
      return collection(this.firestore, 'notes');
    }

    getTrashRef(){
      return collection(this.firestore, 'trash');
    }

    getSingelDocRef(colID:string, docId:string){
      return doc(collection(this.firestore, colID), docId)
    }
  
}


