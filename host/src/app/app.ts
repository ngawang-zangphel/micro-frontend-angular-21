import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly nav = [
    { path: '/home', label: 'Home' },
    { path: '/users', label: 'Users' },
    { path: '/announcements', label: 'Announcements' },
  ];
}
