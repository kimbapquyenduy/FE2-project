import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { GameStateService } from 'src/app/services/game-state.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userScoreList: User[] = [];
  id: string = '';
  score: string = '';
  name: string = '';


  email: string = '';
  password: string = '';

  constructor(private auth: GameStateService, private data: DataService) {

  }

  ngOnInit(): void {
    this.getAllScore();
  }
  getAllScore() {
    this.data.getAllScore().subscribe(res => {
      this.userScoreList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error fecthing data');
    })
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
