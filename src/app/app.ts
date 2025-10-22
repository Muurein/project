import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Mainmenu } from './partials/mainmenu/mainmenu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Mainmenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');
}
