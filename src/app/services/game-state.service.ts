import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { colors, start_Count } from '../models/constants';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  memory: string[] = [];
  player: string[] = [];
  count: number;
  state = new Subject<any>();


  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.count = start_Count


  }
  //login
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/game']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/main']);
    })
  }
  //register
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert("create account successful ! ")
      this.router.navigate(['/main']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/main']);
    })
  }
  signout() {
    this.fireauth.signOut().then(() => {
      this.restartMemory();
      this.player = [];
      localStorage.removeItem(`token`);
      this.router.navigate([`/main`]);
    }, err => {
      alert(err.message);
    })
  }
  private get randomColor(): string {

    return colors[Math.floor(Math.random() * 9)]

  }
  appendMemory(increament: boolean = false): void {
    if (increament) {
      this.count++;
    }

    this.memory.push(this.randomColor);
  }
  generateMemory(): string[] {
    this.memory = [];
    console.log(this.memory);

    for (let i = 0; i < this.count; i++) {
      this.appendMemory();
    }
    this.setState();
    return this.memory;


  }
  restartMemory(): string[] {
    this.count = start_Count;
    return this.generateMemory();
  }

  playerGuest(val: string) {
    this.player.push(val);
    if (!this.compareMemory()) {
      let score = this.count;
      let choose = confirm("Bạn thua rồi! Vui lòng chơi lại." + "\n" + "Điểm của bạn là: " + score);
      if (choose == true) {
        window.location.reload();
      } else {
        // this.restartMemory();
        // this.player = [];
        this.signout();
      }
    }
    this.setState();
  }
  compareMemory(): boolean {
    for (let i = 0; i < this.player.length; i++) {
      if (this.player[i] !== this.memory[i]) {
        return false;
      }
    }
    if (this.player.length === this.memory.length) {
      this.updateGame();
    }
    return true;
  }

  updateGame() {
    this.appendMemory(true);
    this.player = [];
  }
  setState() {
    this.state.next({
      player: this.player,
      memory: this.memory,
      count: this.count
    });
  }
}
