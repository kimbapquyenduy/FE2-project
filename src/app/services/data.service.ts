import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) {


  }
  addScore(user: User) {
    user.id = this.afs.createId();
    return this.afs.collection("/Score").add(user);
  }
  getAllScore() {
    return this.afs.collection("/Score").snapshotChanges();
  }
  deleteScore(user: User) {
    return this.afs.doc('/Score/' + user.id).delete();
  }
  updateScore(user: User) {
    this.deleteScore(user);
    this.addScore(user);
  }
}
