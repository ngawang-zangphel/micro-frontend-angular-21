import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly people = signal([
    { name: 'Maya Chen', role: 'Product design' },
    { name: 'Jonah Adeyemi', role: 'Platform engineer' },
    { name: 'Priya Nair', role: 'People partner' },
    { name: 'Luis Ortega', role: 'Support lead' },
  ]);
}
