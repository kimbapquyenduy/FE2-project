import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { colors, start_Count } from '../models/constants';
@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  memory: string[] = [];
  player: string[] = [];
  count: number;
  state = new Subject<any>();


  constructor() {
    this.count = start_Count
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
      this.player = [];
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
