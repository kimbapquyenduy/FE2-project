import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: GameStateService) { }

  ngOnInit(): void {
  }
  login() {
    if (this.email == '') {
      alert("Chưa Nhập Email");
      return;
    }
    if (this.password == '') {
      alert("Chưa Nhập Password");
      return;
    }
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
  register() {
    if (this.email == '') {
      alert("Chưa Nhập Email");
      return;
    }
    if (this.password == '') {
      alert("Chưa Nhập Password");
      return;
    }
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
