import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarInteractionService } from '../services/sidebar-interaction.service';

interface HeaderNavLink {
  label: string;
  route?: string;
  href?: string;
  accentArrow?: boolean;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header-shell">
      <div class="header-content">
        <a class="brand" routerLink="/">
          <small class="brand-note">личный профиль</small>
          <strong>борис кива</strong>
        </a>

        <nav class="header-nav">
          <ng-container *ngFor="let link of currentLinks">
            <a
              *ngIf="link.route; else anchorLink"
              [routerLink]="link.route"
              routerLinkActive="header-nav__link--active"
              [routerLinkActiveOptions]="{ exact: true }"
              [class.header-nav__link--route]="link.accentArrow"
            >
              <span>{{ link.label }}</span>
              <small *ngIf="link.accentArrow" aria-hidden="true">↗</small>
            </a>

            <ng-template #anchorLink>
              <a [href]="link.href">
                <span>{{ link.label }}</span>
              </a>
            </ng-template>
          </ng-container>
        </nav>

        <div class="header-actions">
          <a class="header-contact" routerLink="/contacts" routerLinkActive="header-contact--active">Контакты</a>

          <button class="menu-button" type="button" (click)="toggleSidebar()" aria-label="Открыть навигацию">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    :host {
      position: sticky;
      top: 0;
      z-index: 30;
      display: block;
    }

    .header-shell {
      width: 100%;
      padding: 18px 24px 0;
    }

    .header-content {
      max-width: 1440px;
      margin: 0 auto;
      min-height: var(--header-small-height);
      padding: 16px 20px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 20px;
      border: 1px solid var(--border-strong);
      border-radius: 30px;
      background: linear-gradient(180deg, rgba(18, 22, 34, 0.82), rgba(13, 16, 26, 0.74));
      backdrop-filter: blur(18px);
      box-shadow: var(--shadow-soft);
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .brand-note {
      color: var(--text-muted);
      font: 600 0.66rem/1 var(--ff-manrope), sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }

    .brand strong {
      font: 700 1rem/1 var(--ff-manrope), sans-serif;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .header-nav {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    .header-nav a {
      min-height: 40px;
      padding: 0 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid transparent;
      border-radius: 999px;
      color: var(--text-secondary);
      font: 600 0.78rem/1 var(--ff-manrope), sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition:
        color var(--fast-transition-time) ease,
        border-color var(--fast-transition-time) ease,
        background var(--fast-transition-time) ease,
        transform var(--fast-transition-time) ease;
    }

    .header-nav a small {
      color: #ffd39f;
      font: 700 0.82rem/1 var(--ff-manrope), sans-serif;
      transform: translateY(-1px);
      transition: transform var(--fast-transition-time) ease;
    }

    .header-nav a:hover,
    .header-nav__link--active {
      color: var(--text-primary);
      border-color: var(--border-strong);
      background: var(--surface-glass);
      transform: translateY(-2px);
    }

    .header-nav__link--route:hover small,
    .header-nav__link--active small {
      transform: translate3d(2px, -3px, 0);
    }

    .header-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .header-contact {
      min-height: 44px;
      padding: 0 18px;
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(255, 119, 74, 0.18), rgba(255, 184, 98, 0.16));
      border: 1px solid rgba(255, 184, 98, 0.32);
      color: #ffc98b;
      font: 700 0.78rem/1 var(--ff-manrope), sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      transition:
        transform var(--fast-transition-time) ease,
        box-shadow var(--fast-transition-time) ease,
        border-color var(--fast-transition-time) ease,
        color var(--fast-transition-time) ease;
    }

    .header-contact:hover,
    .header-contact--active {
      transform: translateY(-2px);
      border-color: rgba(255, 207, 139, 0.48);
      box-shadow: 0 14px 26px rgba(255, 119, 74, 0.16);
      color: #fff1dc;
    }

    .menu-button {
      width: 52px;
      height: 52px;
      border: 1px solid var(--border-strong);
      border-radius: 18px;
      background: var(--surface-glass);
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: transform var(--fast-transition-time) ease, background var(--fast-transition-time) ease;
    }

    .menu-button:hover {
      transform: translateY(-2px);
      background: var(--surface-glow);
    }

    .menu-button span {
      width: 18px;
      height: 2px;
      border-radius: 999px;
      background: var(--text-primary);
    }

    @media screen and (max-width: 980px) {
      .header-content {
        grid-template-columns: auto auto;
        justify-content: space-between;
      }

      .header-nav,
      .header-contact {
        display: none;
      }

      .menu-button {
        display: inline-flex;
      }
    }

    @media screen and (max-width: 700px) {
      .header-shell {
        padding: 12px 12px 0;
      }

      .header-content {
        min-height: 72px;
        padding: 12px 14px;
        border-radius: 22px;
      }

      .brand strong {
        font-size: 0.86rem;
      }

      .brand-note {
        font-size: 0.58rem;
      }

      .menu-button {
        width: 46px;
        height: 46px;
        border-radius: 16px;
      }
    }
  `,
})
export class Header {
  private readonly sidebarInteractionService = inject(SidebarInteractionService);
  private readonly router = inject(Router);

  protected currentLinks: HeaderNavLink[] = [];

  constructor() {
    this.setLinks(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.setLinks((event as NavigationEnd).urlAfterRedirects);
      });
  }

  toggleSidebar(): void {
    this.sidebarInteractionService.toggle();
  }

  private setLinks(url: string): void {
    if (url.startsWith('/projects')) {
      this.currentLinks = [
        { label: 'Обзор', href: '/projects/#projects-overview' },
        { label: 'Кейсы', href: '/projects/#projects-list' },
      ];
      return;
    }

    this.currentLinks = [
      { label: 'Интро', href: '#home-intro' },
      { label: 'Обо мне', href: '#home-about' },
      { label: 'Проекты', href: '#home-selected' },
      { label: 'Контакт', href: '#home-contact' },
      { label: 'Все проекты', route: '/projects', accentArrow: true },
    ];
  }
}
