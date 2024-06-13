import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})

export class HeaderbarComponent implements OnInit {

  token: string | null = null;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.token$.subscribe(token => {
      this.token = token;
    });
  }

  logout() {
    this.tokenService.clearToken();
    window.location.reload();
  }

}
