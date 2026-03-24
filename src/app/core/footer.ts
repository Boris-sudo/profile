import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer-shell">
      <div class="footer-content">
        <div class="footer-copy">
          <p class="footer-eyebrow">архив профиля</p>
          <h3>Сайт собран как персональная сцена: портрет, проекты, исследовательский бэкграунд и инженерная эстетика в одной системе.</h3>
        </div>

        <div class="footer-side">
          <div class="footer-meta">
            <span>Angular</span>
            <span>Анимация</span>
            <span>Фуллстек</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: block;
    }

    .footer-shell {
      padding: 0 24px 24px;
    }

    .footer-content {
      max-width: 1440px;
      margin: 0 auto;
      padding: 24px 28px;
      display: flex;
      justify-content: space-between;
      gap: 24px;
      border: 1px solid var(--border-strong);
      border-radius: 30px;
      background: linear-gradient(180deg, rgba(17, 21, 33, 0.92), rgba(11, 14, 23, 0.92));
      box-shadow: var(--shadow-soft);
    }

    .footer-copy {
      max-width: 620px;
    }

    .footer-eyebrow {
      margin-bottom: 10px;
      color: var(--text-muted);
      font: 700 0.66rem/1 var(--ff-manrope), sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }

    h3 {
      font: 600 1.08rem/1.46 var(--ff-jost), sans-serif;
    }

    .footer-side {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      gap: 18px;
    }

    .footer-meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 10px;
    }

    .footer-meta span {
      min-height: 40px;
      padding: 0 14px;
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      background: var(--surface-glass);
      color: var(--text-secondary);
      font: 600 0.76rem/1 var(--ff-manrope), sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition:
        transform var(--fast-transition-time) ease,
        border-color var(--fast-transition-time) ease,
        background var(--fast-transition-time) ease,
        color var(--fast-transition-time) ease;
      cursor: default;
    }

    .footer-meta span:hover {
      transform: translateY(-3px);
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-primary);
    }

    @media screen and (max-width: 800px) {
      .footer-shell {
        padding: 0 12px 12px;
      }

      .footer-content {
        flex-direction: column;
        padding: 20px;
        border-radius: 24px;
      }

      .footer-side {
        margin-left: 0;
        align-items: flex-start;
      }

      .footer-meta {
        justify-content: flex-start;
      }

      h3 {
        font-size: 0.96rem;
      }
    }
  `,
})
export class Footer {}
