import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarInteractionService } from '../services/sidebar-interaction.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    template: `
        <header class="header-shell">
            <div class="header-content">
                <a class="brand" routerLink="/">
                    <span class="brand-mark">B</span>
                    <span class="brand-copy">
                        <strong>Портфолио Бориса</strong>
                        <small>Fullstack программист, дизайнер и математик</small>
                    </span>
                </a>
                
                <div class="header-actions">
                    <span class="status-pill">Россия • Красногорск</span>
                    <button class="menu-button" type="button" (click)="toggleSidebar()" aria-label="Открыть навигацию">
                        <span></span>
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
            top:      0;
            z-index:  30;
            display:  block;
        }

        .header-shell {
            width:   100%;
            padding: 18px 24px 0;
        }

        .header-content {
            max-width:       1440px;
            margin:          0 auto;
            min-height:      var(--header-small-height);
            display:         flex;
            align-items:     center;
            justify-content: space-between;
            gap:             20px;
            padding:         14px 18px;
            border:          1px solid var(--border-soft);
            border-radius:   var(--br-32);
            background:      linear-gradient(180deg, rgba(18, 25, 38, 0.92), rgba(13, 18, 30, 0.78));
            backdrop-filter: blur(24px);
            box-shadow:      0 18px 50px rgba(0, 0, 0, 0.28);
        }

        .brand {
            display:     inline-flex;
            align-items: center;
            gap:         14px;
        }

        .brand-mark {
            width:         48px;
            height:        48px;
            display:       grid;
            place-items:   center;
            border-radius: 16px;
            background:    linear-gradient(135deg, var(--interaction-primary), var(--background-accent-2));
            color:         var(--text-on-accent);
            font:          700 1.4rem/1 var(--ff-viaoda), serif;
            box-shadow:    0 12px 28px rgba(107, 227, 197, 0.22);
        }

        .brand-copy {
            display:        flex;
            flex-direction: column;
            gap:            2px;
        }

        .brand-copy strong {
            font:           700 1rem/1.1 var(--ff-manrope), sans-serif;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .brand-copy small {
            color: var(--text-secondary);
            font:  500 0.86rem/1.1 var(--ff-jost), sans-serif;
        }

        .header-actions {
            display:     flex;
            align-items: center;
            gap:         12px;
        }

        .status-pill {
            min-height:     42px;
            padding:        0 16px;
            display:        inline-flex;
            align-items:    center;
            border:         1px solid rgba(107, 227, 197, 0.2);
            border-radius:  999px;
            background:     rgba(107, 227, 197, 0.08);
            color:          var(--interaction-primary);
            font:           600 0.82rem/1 var(--ff-manrope), sans-serif;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }

        .menu-button {
            width:           54px;
            height:          54px;
            border:          0;
            border-radius:   18px;
            display:         inline-flex;
            flex-direction:  column;
            align-items:     center;
            justify-content: center;
            gap:             5px;
            cursor:          pointer;
            background:      linear-gradient(180deg, rgba(30, 39, 58, 0.96), rgba(21, 28, 44, 0.96));
            box-shadow:      inset 0 1px 0 rgba(255, 255, 255, 0.04);
            transition:      transform var(--fast-transition-time) ease,
                             background var(--fast-transition-time) ease,
                             box-shadow var(--fast-transition-time) ease;
        }

        .menu-button:hover {
            transform:  translateY(-2px);
            background: linear-gradient(180deg, rgba(39, 52, 77, 0.96), rgba(24, 34, 54, 0.96));
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04),
                        0 12px 24px rgba(0, 0, 0, 0.22);
        }

        .menu-button span {
            width:         18px;
            height:        2px;
            border-radius: 999px;
            background:    var(--text-primary);
        }

        @media screen and (max-width: 700px) {
            .header-shell {
                padding: 14px 12px 0;
            }

            .header-content {
                padding:       12px 14px;
                border-radius: 24px;
            }

            .brand-copy small {
                display: none;
            }

            .brand-copy strong {
                font-size:      0.86rem;
                letter-spacing: 0.06em;
            }

            .status-pill {
                display: none;
            }
        }
    `,
})
export class Header {
    private readonly sidebarInteractionService = inject(SidebarInteractionService);

    toggleSidebar(): void {
        this.sidebarInteractionService.toggle();
    }
}
