import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer-shell">
      <div class="footer-content">
        <div class="footer-copy">
          <p class="footer-label">Портфолио</p>
          <h3>Кива Борис. Fullstack программист, дизайнер и математик с интересом к продуктовой разработке, интерфейсам и алгоритмам.</h3>
        </div>

        <div class="footer-meta">
          <span>Angular 21</span>
          <span>Node.js</span>
          <span>Python</span>
          <span>2026</span>
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
      display: flex;
      justify-content: space-between;
      gap: 24px;
      padding: 24px 28px;
      border: 1px solid var(--border-soft);
      border-radius: 28px;
      background:
        radial-gradient(circle at top left, rgba(107, 227, 197, 0.08), transparent 24%),
        linear-gradient(180deg, rgba(18, 25, 39, 0.92), rgba(11, 17, 29, 0.92));
    }

    .footer-label {
      margin-bottom: 10px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font: 600 0.74rem/1 var(--ff-manrope), sans-serif;
    }

    h3 {
      max-width: 620px;
      font: 600 1.15rem/1.4 var(--ff-jost), sans-serif;
    }

    .footer-meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-content: flex-start;
      gap: 10px;
    }

    .footer-meta span {
      position: relative;
      overflow: hidden;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-secondary);
      border: 1px solid rgba(255, 255, 255, 0.06);
      font: 500 0.88rem/1 var(--ff-manrope), sans-serif;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
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

      .footer-meta {
        justify-content: flex-start;
      }

      h3 {
        font-size: 1rem;
        line-height: 1.38;
      }

      .footer-meta span {
        font-size: 0.8rem;
      }
    }
  `,
})
export class Footer {}
