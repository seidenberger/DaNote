import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot, addDoc, updateDoc} from '@angular/fire/firestore';
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

  async updateNote(note: Note){
    if(note.id){
      let docRef = this.getSingelDocRef(this.getColIdFromNote(note), note.id)
      // console.log(14 - Praxis: UPDATE -> updateDoc());
      // let docRef = this.getSingelDocRef(this.getColIdFromNote(note), docId)
      await updateDoc(docRef, this.getCleanJason(note)).catch(
        (err) => {console.log(err);}
      );
    }
  }


  getCleanJason(note: Note):{} {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked:  note.marked,
    }
  }

  getColIdFromNote(note: Note){
    if(note.type == 'note'){
      return 'notes'
      }else {
        return 'trash'
    }
    
  }

  async addNote(note: Note){
    await addDoc(this.getNotesRef(),note).catch(
      (err) => {console.error(err)}
    ).then(
      (docRef) => {console.log("document ID:", docRef?.id);}
    )
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


