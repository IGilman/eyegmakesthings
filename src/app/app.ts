import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main id="main-content">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    #main-content {
      min-height: 100vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}