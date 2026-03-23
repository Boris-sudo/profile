import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer';
import { Header } from './core/header';
import { Sidebar } from './core/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Footer],
  template: `
    <div class="app-shell">
      <app-sidebar />
      <app-header />
      <main class="app-content">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(circle at top left, rgba(107, 227, 197, 0.14), transparent 24%),
        radial-gradient(circle at top right, rgba(255, 159, 67, 0.16), transparent 28%),
        radial-gradient(circle at 50% 20%, rgba(90, 139, 255, 0.1), transparent 30%),
        linear-gradient(180deg, var(--background-primary) 0%, var(--background-secondary) 48%, rgb(11, 16, 26) 100%);
    }

    .app-content {
      flex: 1;
      display: block;
    }
  `,
})
export class App {}
