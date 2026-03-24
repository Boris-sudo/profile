import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarInteractionService } from '../services/sidebar-interaction.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar-overlay" [class.sidebar-overlay--visible]="isOpen()" (click)="close()"></div>

    <aside class="sidebar" [class.sidebar--open]="isOpen()" aria-label="Боковая навигация">
      <div class="sidebar-head">
        <div>
          <p class="sidebar-eyebrow">навигация</p>
          <h2>Профиль Бориса Кивы</h2>
        </div>

        <button class="close-button" type="button" (click)="close()" aria-label="Закрыть навигацию">
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>

      <nav class="sidebar-nav">
        <a
          *ngFor="let link of navLinks"
          class="sidebar-link"
          [routerLink]="link.path"
          routerLinkActive="sidebar-link--active"
          [routerLinkActiveOptions]="{ exact: link.exact }"
          (click)="close()"
        >
          <small>{{ link.index }}</small>
          <div>
            <span>{{ link.label }}</span>
            <p>{{ link.caption }}</p>
          </div>
        </a>
      </nav>

      <div class="sidebar-card">
        <small>основной стек</small>
        <p>Angular, React, Node.js, Python, C++, Lean, UI/UX, математическое мышление и исследовательский подход.</p>
      </div>
    </aside>
  `,
  styles: `
    :host {
      display: block;
    }

    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(5, 7, 13, 0.52);
      backdrop-filter: blur(6px);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--fast-transition-time) ease;
      z-index: 39;
    }

    .sidebar-overlay--visible {
      opacity: 1;
      pointer-events: auto;
    }

    .sidebar {
      position: fixed;
      top: 12px;
      left: 12px;
      bottom: 12px;
      width: min(390px, calc(100vw - 24px));
      padding: 26px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      border: 1px solid var(--border-strong);
      border-radius: 32px;
      background: linear-gradient(180deg, rgba(18, 22, 34, 0.96), rgba(10, 13, 22, 0.98));
      box-shadow: var(--shadow-strong);
      transform: translateX(calc(-100% - 32px));
      transition: transform var(--slow-transition-time) cubic-bezier(0.2, 0.9, 0.2, 1);
      z-index: 40;
    }

    .sidebar--open {
      transform: translateX(0);
    }

    .sidebar-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 14px;
    }

    .sidebar-eyebrow {
      margin-bottom: 8px;
      color: var(--text-muted);
      font: 700 0.66rem/1 var(--ff-manrope), sans-serif;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h2 {
      max-width: 240px;
      font: 700 1.8rem/0.98 var(--ff-tinos), serif;
    }

    .close-button {
      width: 46px;
      min-width: 46px;
      height: 46px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 46px;
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      background: var(--surface-glass);
      cursor: pointer;
      color: var(--text-primary);
      transition:
        transform var(--fast-transition-time) ease,
        border-color var(--fast-transition-time) ease,
        background var(--fast-transition-time) ease;
    }

    .close-button span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font: 400 1.3rem/1 var(--ff-jost), sans-serif;
      transform: translateY(-1px);
      transition: transform var(--fast-transition-time) ease;
    }

    .close-button:hover {
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.24);
      background: rgba(255, 255, 255, 0.08);
    }

    .close-button:hover span {
      transform: translateY(-1px) rotate(90deg);
    }

    .sidebar-nav {
      display: grid;
      gap: 12px;
    }

    .sidebar-link {
      padding: 16px;
      display: grid;
      grid-template-columns: 46px 1fr;
      gap: 14px;
      border: 1px solid transparent;
      border-radius: 24px;
      background: var(--surface-glass);
      transition:
        transform var(--fast-transition-time) ease,
        border-color var(--fast-transition-time) ease,
        background var(--fast-transition-time) ease;
    }

    .sidebar-link:hover,
    .sidebar-link--active {
      transform: translateX(4px);
      border-color: var(--border-strong);
      background: rgba(255, 255, 255, 0.06);
    }

    .sidebar-link small {
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      color: var(--text-accent);
      font: 700 0.72rem/1 var(--ff-manrope), sans-serif;
      letter-spacing: 0.08em;
    }

    .sidebar-link span {
      display: block;
      margin-bottom: 6px;
      font: 700 0.98rem/1.08 var(--ff-manrope), sans-serif;
    }

    .sidebar-link p,
    .sidebar-card p {
      color: var(--text-secondary);
      font: 400 0.9rem/1.46 var(--ff-jost), sans-serif;
    }

    .sidebar-card {
      margin-top: auto;
      padding: 18px;
      border: 1px solid var(--border-strong);
      border-radius: 24px;
      background: linear-gradient(135deg, rgba(255, 119, 74, 0.12), rgba(90, 136, 255, 0.1));
    }

    .sidebar-card small {
      display: inline-flex;
      margin-bottom: 10px;
      color: var(--text-accent);
      font: 700 0.66rem/1 var(--ff-manrope), sans-serif;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    @media screen and (max-width: 700px) {
      .sidebar {
        top: 8px;
        left: 8px;
        bottom: 8px;
        width: min(330px, calc(100vw - 16px));
        padding: 20px;
        border-radius: 24px;
      }

      h2 {
        font-size: 1.46rem;
      }

      .close-button {
        width: 42px;
        min-width: 42px;
        height: 42px;
        flex-basis: 42px;
        border-radius: 14px;
      }

      .close-button span {
        font-size: 1.16rem;
      }

      .sidebar-link {
        grid-template-columns: 42px 1fr;
        padding: 14px;
      }

      .sidebar-link small {
        width: 42px;
        height: 42px;
        border-radius: 14px;
      }

      .sidebar-link span {
        font-size: 0.9rem;
      }

      .sidebar-link p,
      .sidebar-card p {
        font-size: 0.82rem;
      }
    }
  `,
})
export class Sidebar {
  private readonly sidebarInteractionService = inject(SidebarInteractionService);

  protected readonly isOpen = this.sidebarInteractionService.isOpen;
  protected readonly navLinks = [
    { index: '01', path: '/', label: 'Главная', caption: 'Интро, история, фокус и выбранные проекты', exact: true },
    { index: '02', path: '/projects', label: 'Проекты', caption: 'Каталог кейсов, стек и GitHub-ссылки', exact: true },
    { index: '03', path: '/contacts', label: 'Контакты', caption: 'Почта, Telegram, GitHub и способы связи', exact: true },
  ];

  close(): void {
    this.sidebarInteractionService.close();
  }
}
