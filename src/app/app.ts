import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer';
import { Header } from './core/header';
import { Sidebar } from './core/sidebar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Sidebar, Footer],
  template: `
    <div class="app-shell" [style.--px]="pointerX" [style.--py]="pointerY">
      <div class="app-grid"></div>
      <div class="app-orb app-orb--left"></div>
      <div class="app-orb app-orb--right"></div>
      <div class="app-glow"></div>
      <div class="app-fog"></div>

      <div class="loading-screen" *ngIf="showLoader()" [class.loading-screen--leaving]="loaderLeaving()">
        <div class="loading-screen__mist"></div>
        <div class="loading-screen__content">
          <p>Борис Кива</p>
          <h1>Портфолио</h1>
          <div class="loading-screen__progress">
            <strong>{{ loadingProgress() }}%</strong>
            <span>загрузка сцены</span>
          </div>
        </div>
      </div>

      <div class="app-stage" [class.app-stage--ready]="contentReady()">
        <app-sidebar />
        <app-header />
        <main class="app-content">
          <router-outlet />
        </main>
        <app-footer />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-shell {
      --px: 50;
      --py: 50;
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% -10%, rgba(255, 106, 72, 0.14), transparent 32%),
        linear-gradient(180deg, var(--background-primary) 0%, var(--background-secondary) 54%, rgb(7, 9, 15) 100%);
    }

    .app-grid,
    .app-orb,
    .app-glow,
    .app-fog {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    .app-grid {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 72px 72px;
      mask-image: radial-gradient(circle at center, black 36%, transparent 86%);
      opacity: 0.35;
      transform: translate(calc((var(--px) - 50) * 0.12px), calc((var(--py) - 50) * 0.12px));
    }

    .app-orb {
      transition: transform 180ms ease-out;
      filter: blur(20px);
      opacity: 0.72;
    }

    .app-orb--left {
      transform: translate(calc((var(--px) - 50) * -0.28px), calc((var(--py) - 50) * -0.16px));
    }

    .app-orb--left::before {
      content: '';
      position: absolute;
      top: 8%;
      left: -8%;
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 106, 72, 0.2), transparent 66%);
    }

    .app-orb--right {
      transform: translate(calc((var(--px) - 50) * 0.22px), calc((var(--py) - 50) * 0.18px));
    }

    .app-orb--right::before {
      content: '';
      position: absolute;
      right: -8%;
      top: 28%;
      width: 460px;
      height: 460px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(90, 136, 255, 0.18), transparent 66%);
    }

    .app-glow::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at calc(var(--px) * 1%) calc(var(--py) * 1%), rgba(255, 196, 104, 0.14), transparent 18%);
      opacity: 0.85;
    }

    .app-fog::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -4%;
      height: 28vh;
      background:
        radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.08), transparent 32%),
        radial-gradient(circle at 50% 60%, rgba(255, 193, 128, 0.1), transparent 36%),
        radial-gradient(circle at 85% 50%, rgba(141, 172, 255, 0.08), transparent 32%);
      filter: blur(44px);
      opacity: 0.7;
    }

    .loading-screen {
      position: fixed;
      inset: 0;
      z-index: 80;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at center, rgba(255, 184, 98, 0.1), transparent 24%),
        linear-gradient(180deg, rgba(9, 11, 18, 0.98), rgba(7, 9, 15, 0.99));
      transition:
        opacity 720ms ease,
        visibility 720ms ease;
    }

    .loading-screen--leaving {
      opacity: 0;
      visibility: hidden;
    }

    .loading-screen__mist {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.08), transparent 22%),
        radial-gradient(circle at 70% 60%, rgba(90, 136, 255, 0.08), transparent 24%);
      filter: blur(30px);
      animation: mistFloat 4.4s ease-in-out infinite alternate;
    }

    .loading-screen__content {
      position: relative;
      z-index: 1;
      text-align: center;
      animation: loaderRise 1.1s cubic-bezier(0.2, 0.9, 0.2, 1);
    }

    .loading-screen__content p,
    .loading-screen__content span {
      color: var(--text-muted);
      font: 700 0.72rem/1 var(--ff-manrope), sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.22em;
    }

    .loading-screen__content p {
      margin-bottom: 14px;
    }

    .loading-screen__content h1 {
      margin-bottom: 14px;
      font: 700 clamp(3rem, 10vw, 8rem) / 0.9 var(--ff-tinos), serif;
      letter-spacing: -0.06em;
    }

    .loading-screen__progress {
      display: grid;
      gap: 10px;
      justify-items: center;
    }

    .loading-screen__progress strong {
      min-width: 96px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--text-primary);
      font: 700 clamp(1.4rem, 4vw, 2.4rem) / 1 var(--ff-manrope), sans-serif;
      letter-spacing: 0.04em;
    }

    .app-stage {
      position: relative;
      z-index: 1;
      min-height: 100vh;
    }

    .app-stage app-header,
    .app-stage .app-content,
    .app-stage app-footer {
      opacity: 0;
      transform: translateY(26px);
    }

    .app-stage--ready app-header {
      animation: stageReveal 760ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
    }

    .app-stage--ready .app-content {
      animation: stageReveal 860ms cubic-bezier(0.2, 0.9, 0.2, 1) 120ms forwards;
    }

    .app-stage--ready app-footer {
      animation: stageReveal 860ms cubic-bezier(0.2, 0.9, 0.2, 1) 220ms forwards;
    }

    .app-content {
      position: relative;
      z-index: 1;
      flex: 1;
      display: block;
    }

    @keyframes loaderRise {
      from {
        opacity: 0;
        transform: translateY(42px) scale(0.96);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes mistFloat {
      from {
        transform: scale(1) translateY(0);
      }

      to {
        transform: scale(1.06) translateY(-18px);
      }
    }

    @keyframes stageReveal {
      from {
        opacity: 0;
        transform: translateY(26px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export class App implements OnInit, OnDestroy {
  protected pointerX = '50';
  protected pointerY = '50';
  protected readonly showLoader = signal(true);
  protected readonly loaderLeaving = signal(false);
  protected readonly loadingProgress = signal(0);
  protected readonly contentReady = signal(false);

  private progressIntervalId: number | null = null;
  private leaveTimeoutId: number | null = null;
  private hideTimeoutId: number | null = null;

  ngOnInit(): void {
    this.progressIntervalId = window.setInterval(() => {
      const next = this.loadingProgress() + 7;
      this.loadingProgress.set(Math.min(next, 100));

      if (next >= 100 && this.progressIntervalId !== null) {
        window.clearInterval(this.progressIntervalId);
        this.progressIntervalId = null;
      }
    }, 80);

    this.leaveTimeoutId = window.setTimeout(() => {
      this.loadingProgress.set(100);
      this.loaderLeaving.set(true);

      this.hideTimeoutId = window.setTimeout(() => {
        this.showLoader.set(false);
        this.contentReady.set(true);
      }, 720);
    }, 1200);
  }

  ngOnDestroy(): void {
    if (this.progressIntervalId !== null) {
      window.clearInterval(this.progressIntervalId);
    }

    if (this.leaveTimeoutId !== null) {
      window.clearTimeout(this.leaveTimeoutId);
    }

    if (this.hideTimeoutId !== null) {
      window.clearTimeout(this.hideTimeoutId);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.pointerX = ((event.clientX / window.innerWidth) * 100).toFixed(2);
    this.pointerY = ((event.clientY / window.innerHeight) * 100).toFixed(2);
  }
}
