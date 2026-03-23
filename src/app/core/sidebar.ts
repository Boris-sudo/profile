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
          <p class="eyebrow">Навигация</p>
          <h2>Портфолио</h2>
        </div>
        <button type="button" class="close-button" (click)="close()" aria-label="Закрыть навигацию">x</button>
      </div>

      <nav class="sidebar-nav">
        <a
          *ngFor="let link of navLinks"
          class="nav-link"
          [routerLink]="link.path"
          routerLinkActive="nav-link--active"
          [routerLinkActiveOptions]="{ exact: link.exact }"
          (click)="close()"
        >
          <span>{{ link.label }}</span>
          <small>{{ link.caption }}</small>
        </a>
      </nav>

      <div class="sidebar-metric">
        <strong>27</strong>
        <span>Публичных репозиториев на GitHub, включая frontend, ботов, математические и игровые проекты.</span>
      </div>

      <div class="sidebar-footer">
        <p>Angular, React, Node.js, Python, C++, Lean и визуальный подход, завязанный на чистой структуре.</p>
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
      background: rgba(4, 8, 15, 0.52);
      backdrop-filter: blur(8px);
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
      width: min(360px, calc(100vw - 24px));
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      border-radius: 28px;
      background:
        radial-gradient(circle at top left, rgba(107, 227, 197, 0.1), transparent 32%),
        linear-gradient(180deg, rgba(18, 25, 39, 0.98), rgba(11, 17, 29, 0.98));
      border: 1px solid var(--border-soft);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.38);
      transform: translateX(calc(-100% - 30px));
      transition: transform var(--slow-transition-time) cubic-bezier(0.2, 0.9, 0.2, 1);
      z-index: 40;
    }

    .sidebar--open {
      transform: translateX(0);
    }

    .sidebar-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .eyebrow {
      margin-bottom: 8px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font: 600 0.74rem/1 var(--ff-manrope), sans-serif;
    }

    h2 {
      font: 700 2rem/1 var(--ff-viaoda), serif;
    }

    .close-button {
      width: 42px;
      height: 42px;
      border: 0;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-primary);
      font-size: 1.1rem;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 1;
      cursor: pointer;
    }

    .sidebar-nav {
      display: grid;
      gap: 12px;
    }

    .nav-link {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 16px 18px;
      border-radius: 18px;
      border: 1px solid transparent;
      background:
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.04), transparent 24%),
        rgba(255, 255, 255, 0.02);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
      transition:
        transform var(--fast-transition-time) ease,
        background var(--fast-transition-time) ease,
        border-color var(--fast-transition-time) ease,
        box-shadow var(--fast-transition-time) ease;
    }

    .nav-link::before,
    .sidebar-metric::before,
    .sidebar-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 18px;
      right: 18px;
      height: 1px;
      background: linear-gradient(90deg, rgba(107, 227, 197, 0), rgba(107, 227, 197, 0.6), rgba(255, 210, 74, 0.35), rgba(107, 227, 197, 0));
    }

    .nav-link:hover,
    .nav-link--active {
      background: rgba(107, 227, 197, 0.08);
      border-color: rgba(107, 227, 197, 0.18);
      transform: translateX(4px);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
    }

    .nav-link span {
      font: 600 1rem/1.2 var(--ff-manrope), sans-serif;
    }

    .nav-link small {
      color: var(--text-secondary);
      font: 400 0.9rem/1.3 var(--ff-jost), sans-serif;
    }

    .sidebar-metric {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 18px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      background:
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.04), transparent 24%),
        linear-gradient(135deg, rgba(255, 210, 74, 0.1), rgba(255, 110, 64, 0.08));
    }

    .sidebar-metric strong {
      font: 700 2.4rem/1 var(--ff-manrope), sans-serif;
      color: var(--background-accent-2);
    }

    .sidebar-metric span {
      color: var(--text-secondary);
      font: 400 0.95rem/1.5 var(--ff-jost), sans-serif;
    }

    .sidebar-footer {
      position: relative;
      overflow: hidden;
      padding: 18px;
      border-radius: 20px;
      background:
        radial-gradient(circle at top right, rgba(255, 255, 255, 0.04), transparent 24%),
        linear-gradient(135deg, rgba(90, 139, 255, 0.12), rgba(107, 227, 197, 0.08));
      color: var(--text-secondary);
      font: 400 0.94rem/1.5 var(--ff-jost), sans-serif;
    }

    @media screen and (max-width: 700px) {
      .sidebar {
        top: 8px;
        left: 8px;
        bottom: 8px;
        width: min(320px, calc(100vw - 16px));
        padding: 20px;
      }

      h2 {
        font-size: 1.55rem;
      }

      .nav-link span {
        font-size: 0.92rem;
      }

      .nav-link small,
      .sidebar-metric span,
      .sidebar-footer {
        font-size: 0.84rem;
        line-height: 1.45;
      }

      .sidebar-metric strong {
        font-size: 2rem;
      }
    }
  `,
})
export class Sidebar {
  private readonly sidebarInteractionService = inject(SidebarInteractionService);

  protected readonly isOpen = this.sidebarInteractionService.isOpen;
  protected readonly navLinks = [
    { path: '/', label: 'Главная', caption: 'Кто я, чем занимаюсь и что уже сделал', exact: true },
    { path: '/projects', label: 'Проекты', caption: 'Trip Tuner, Styllz, Lean и Telegram bot', exact: true },
    { path: '/about', label: 'Обо мне', caption: 'Образование, навыки, награды и стек', exact: true },
    { path: '/contacts', label: 'Контакты', caption: 'Почта, телефон, адрес и GitHub', exact: true },
  ];

  close(): void {
    this.sidebarInteractionService.close();
  }
}
