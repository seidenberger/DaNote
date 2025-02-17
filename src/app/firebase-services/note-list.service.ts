import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot} from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  traschNotes: Note[] = [];
  normalNotes: Note[] = [];

  items$;
  items;

  unsublist;
  unsubSingel;

  firestore = inject(Firestore);

  constructor() { 

    this.unsublist = onSnapshot(this.getNotesRef(), (list) =>{
      list.forEach(element => {
        // console.log(element.id)
        console.log(this.steNoteObject(element.data(), element.id))
      });
    });

    this.unsubSingel = onSnapshot(this.getSingelDocRef("notes", "43156146164"), (element ) =>{
    });

  this.unsubSingel();


    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element)
      });
    }) 
  }

  ngonDestroy(){
    this.unsublist();
    this.items.unsubscribe();
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
