import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly notes = signal([
    { title: 'Office hours move to Thursday', when: 'Today' },
    { title: 'Benefits window opens Monday', when: 'Yesterday' },
    { title: 'Kitchen closed Friday morning', when: 'Monday' },
  ]);
}
