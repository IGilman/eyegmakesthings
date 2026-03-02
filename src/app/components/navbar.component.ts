import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PortfolioService } from '../portfolio.service';

interface NavLink {
  label: string;
  anchor: string;
}

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <mat-toolbar
      role="banner"
      [class.scrolled]="scrolled()"
      class="navbar-toolbar"
    >
      <div class="container navbar-inner">
        <a href="#hero" class="navbar-logo" aria-label="Isaac Gilman — go to top">
          <span class="logo-initials" aria-hidden="true">IG</span>
          <span class="logo-name">{{ portfolio.name }}</span>
        </a>

        <nav aria-label="Main navigation" class="navbar-links">
          @for (link of navLinks; track link.anchor) {
            <a [href]="'#' + link.anchor" class="nav-link">{{ link.label }}</a>
          }
        </nav>

        <button
          mat-icon-button
          class="mobile-menu-btn"
          [matMenuTriggerFor]="mobileMenu"
          aria-label="Open navigation menu"
        >
          <mat-icon>menu</mat-icon>
        </button>

        <mat-menu #mobileMenu="matMenu" xPosition="before">
          @for (link of navLinks; track link.anchor) {
            <a mat-menu-item [href]="'#' + link.anchor">{{ link.label }}</a>
          }
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      position: sticky;
      top: 0;
      z-index: 100;
      display: block;
    }

    .skip-link {
      position: absolute;
      top: -100px;
      left: 1rem;
      background: var(--color-accent);
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.875rem;
      font-weight: 500;
      z-index: 999;
      text-decoration: none;
      transition: top 0.2s;
      &:focus { top: 0.5rem; }
    }

    .navbar-toolbar {
      height: var(--nav-height);
      padding: 0;
    }

    .navbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .navbar-logo {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      text-decoration: none;
      color: var(--color-ink);
      transition: opacity var(--transition);
      &:hover { opacity: 0.72; }
    }

    .logo-initials {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      background: var(--color-accent);
      color: #fff;
      border-radius: var(--radius-sm);
      font-family: var(--font-display);
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .logo-name {
      font-size: 0.95rem;
      font-weight: 500;
    }

    .navbar-links {
      display: flex;
      align-items: center;
      gap: 0.15rem;
    }

    .nav-link {
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--color-ink-muted);
      text-decoration: none;
      padding: 0.4rem 0.85rem;
      border-radius: var(--radius-sm);
      transition: color var(--transition), background var(--transition);
      &:hover {
        color: var(--color-ink);
        background: var(--color-surface-alt);
      }
    }

    .nav-cta { margin-left: 0.5rem; }
    .mobile-menu-btn { display: none !important; }

    @media (max-width: 768px) {
      .navbar-links { display: none; }
      .mobile-menu-btn { display: inline-flex !important; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-scrolled]': 'scrolled()' },
})
export class NavbarComponent {
  readonly portfolio = inject(PortfolioService);
  readonly scrolled = signal(false);

  readonly navLinks: NavLink[] = [
    { label: 'About', anchor: 'about' },
    { label: 'Experience', anchor: 'experience' },
    { label: 'Projects', anchor: 'projects' },
    { label: 'Skills', anchor: 'skills' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }
}