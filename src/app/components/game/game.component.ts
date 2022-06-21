
import { Component, Input, OnInit, Output } from '@angular/core';
import { sleep } from 'src/app/models/constants';
import { GameStateService } from 'src/app/services/game-state.service';

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


  constructor(private game: GameStateService) { }

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
    console.log("a");
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
