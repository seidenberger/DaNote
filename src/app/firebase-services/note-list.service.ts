import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot} from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  // items$;
  // items;

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
    // this.items.unsubscribe();
  }

  subTrashList(){
    return onSnapshot(this.getTrashRef(), (list) =>{
      this.trashNotes = [];
      list.forEach(element => {
        // console.log(element.id)
      //   console.log(this.steNoteObject(element.data(), element.id))
      
      this.trashNotes.push(this.steNoteObject(element.data(), element.id))
    });
    });
  }

  //   this.unsubNotes = onSnapshot(this.getSingelDocRef("notes", "43156146164"), (element ) =>{
  //   });

  // this.unsubNotes();


    // this.items$ = collectionData(this.getNotesRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element)
    //   });
    // }) 
  // }


  subNotesList(){
    return onSnapshot(this.getNotesRef(), (list) =>{
      this.normalNotes = [];
      list.forEach(element => {
        // console.log(element.id)
      //   console.log(this.steNoteObject(element.data(), element.id))
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

    // getTrashRef() {

    // }

    getSingelDocRef(colID:string, docId:string){
      return doc(collection(this.firestore, colID), docId)
    }
  
}


