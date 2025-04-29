import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterModule],
  standalone:true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Final-Employee-Management-Frontend';
}
