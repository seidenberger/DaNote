export interface Note {
    // hab ich gebraucht wegen fehler let note: Note = {
    id?: string;
    // id: string;
    type: "note" | "trash";
    title:string;
    content:string;
    marked: boolean;
}
