
import { Component, Input, OnInit, Output } from '@angular/core';
import { sleep } from 'src/app/models/constants';
import { User } from 'src/app/models/user';
import { GameStateService } from 'src/app/services/game-state.service';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  count: number | undefined;
  colors: any = {
    Red: false,
    Blue: false,
    Yellow: false,
    White: false,
    Orange: false,
    Pink: false,
    Purple: false,
    Teal: false,
    Green: false

  };
  userPoint: User = {
    id: '',
    score: '',
    email: ''
  };


  constructor(private game: GameStateService, private auth: AngularFireAuth,
    private fs: AngularFirestore) { }

  ngOnInit(): void {
    this.game.state.subscribe(state => {
      console.log(state);
      if (this.count != state.count) {
        this.count = state.count;
        this.flash(state.memory);
      }

    });
    this.game.generateMemory();
  }
  playerGuess(g: string) {
    this.game.playerGuest(g);
  }
  restart() {

    this.flash(this.game.restartMemory());
  }
  logout() {
    this.game.signout();
  }
  async flash(memory: string[]) {
    for (let i = 0; i < memory.length; i++) {
      this.colors[memory[i]] = true;
      await sleep(500);
      this.colors[memory[i]] = false;
      await sleep(200);
    }
  }

}
