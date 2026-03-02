import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-about',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <section id="hero" aria-labelledby="hero-heading" class="hero-section">
      <div class="hero-bg-shape" aria-hidden="true"></div>

      <div class="container hero-inner">

        <!-- Left: identity + bio + contact -->
        <div class="hero-content">
          <p class="hero-eyebrow fade-up delay-1">
            <span aria-hidden="true">👋</span> Hello, I'm
          </p>
          <h1 id="hero-heading" class="hero-name fade-up delay-2">
            {{ portfolio.name }}
          </h1>
          <p class="hero-title fade-up delay-3">{{ portfolio.title }}</p>
          <p class="hero-bio fade-up delay-4">{{ portfolio.bio }}</p>

          <div class="hero-details fade-up delay-4" aria-label="Personal details">
            <span class="detail-item">
              <mat-icon aria-hidden="true">location_on</mat-icon>
              {{ portfolio.location }}
            </span>
            <span class="detail-item">
              <mat-icon aria-hidden="true">work</mat-icon>
              {{ portfolio.title }}
            </span>
          </div>

          <div class="contact-links fade-up delay-5" aria-label="Contact and social links">
            <a [href]="'mailto:' + portfolio.email" class="contact-link" aria-label="Send email to Isaac">
              <span class="contact-link-icon" aria-hidden="true"><mat-icon>mail</mat-icon></span>
              <span class="contact-link-text">{{ portfolio.email }}</span>
            </a>
            <a [href]="'tel:' + portfolio.phone" class="contact-link" aria-label="Call Isaac">
              <span class="contact-link-icon" aria-hidden="true"><mat-icon>phone</mat-icon></span>
              <span class="contact-link-text">{{ portfolio.phone }}</span>
            </a>
            <a href="https://www.linkedin.com/in/isaacgilman/" target="_blank" rel="noopener noreferrer" class="contact-link" aria-label="LinkedIn (opens in new tab)">
              <span class="contact-link-icon" aria-hidden="true"><mat-icon>link</mat-icon></span>
              <span class="contact-link-text">LinkedIn</span>
              <mat-icon class="contact-link-arrow" aria-hidden="true">open_in_new</mat-icon>
            </a>
            <a href="https://github.com/isaacgilman" target="_blank" rel="noopener noreferrer" class="contact-link" aria-label="GitHub (opens in new tab)">
              <span class="contact-link-icon" aria-hidden="true"><mat-icon>code</mat-icon></span>
              <span class="contact-link-text">GitHub</span>
              <mat-icon class="contact-link-arrow" aria-hidden="true">open_in_new</mat-icon>
            </a>
          </div>

          <div class="hero-actions fade-up delay-6">
            <a mat-raised-button color="primary" href="#projects">
              View My Work
              <mat-icon iconPositionEnd>arrow_downward</mat-icon>
            </a>
            <a mat-stroked-button href="#experience">Experience</a>
          </div>
        </div>

        <!-- Right: avatar + stats stacked -->
        <div class="hero-right">
          <div class="avatar-wrap fade-up delay-3" aria-hidden="true">
            <div class="avatar-ring">
              <div class="avatar-initials">{{ initials }}</div>
            </div>
            <div class="floating-tag tag-1">
              <mat-icon>code</mat-icon>
              <span>Full Stack</span>
            </div>
            <div class="floating-tag tag-2">
              <mat-icon>groups</mat-icon>
              <span>125+ CoP Members</span>
            </div>
          </div>

          <div class="stats-grid fade-up delay-4" aria-label="Career highlights">
            @for (stat of stats; track stat.label) {
              <div class="stat-card" role="figure" [attr.aria-label]="stat.value + ' ' + stat.label">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            }
          </div>
        </div>

      </div>

      <div class="scroll-hint fade-up delay-6" aria-hidden="true">
        <span>Scroll to explore</span>
        <mat-icon>keyboard_arrow_down</mat-icon>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: calc(100vh - var(--nav-height));
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      padding: 5rem 0 7rem;
      background: var(--color-bg);
    }

    .hero-bg-shape {
      position: absolute;
      top: -20%;
      right: -15%;
      width: 60vw;
      height: 60vw;
      max-width: 700px;
      max-height: 700px;
      background: radial-gradient(circle at 60% 40%, var(--color-accent-light) 0%, transparent 65%);
      border-radius: 50%;
      pointer-events: none;
    }

    /* Two equal columns, both start at the top */
    .hero-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: start;
      gap: 5rem;
    }

    /* Left column */
    .hero-content {
      display: flex;
      flex-direction: column;
    }

    .hero-eyebrow {
      font-size: 1rem;
      font-weight: 400;
      color: var(--color-ink-muted);
      margin-bottom: 0.4rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .hero-name {
      font-family: var(--font-display);
      font-size: clamp(2.75rem, 5vw, 4.5rem);
      line-height: 1.05;
      color: var(--color-ink);
      margin-bottom: 0.3rem;
      letter-spacing: -0.02em;
    }

    .hero-title {
      font-size: clamp(1rem, 2vw, 1.25rem);
      font-weight: 400;
      color: var(--color-accent);
      margin-bottom: 1.25rem;
    }

    .hero-bio {
      font-size: 0.975rem;
      font-weight: 300;
      color: var(--color-ink-muted);
      line-height: 1.75;
      margin-bottom: 1.25rem;
    }

    .hero-details {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.85rem;
      color: var(--color-ink-muted);

      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
        color: var(--color-accent);
      }
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .contact-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.9rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      text-decoration: none;
      color: var(--color-ink);
      font-size: 0.875rem;
      transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);

      &:hover {
        border-color: var(--color-accent);
        box-shadow: var(--shadow-sm);
        transform: translateX(4px);

        .contact-link-icon {
          background: var(--color-accent);
          mat-icon { color: #fff; }
        }
      }
    }

    .contact-link-icon {
      width: 30px;
      height: 30px;
      border-radius: var(--radius-sm);
      background: var(--color-accent-light);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background var(--transition);

      mat-icon {
        font-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
        color: var(--color-accent);
        transition: color var(--transition);
      }
    }

    .contact-link-text { flex: 1; }

    .contact-link-arrow {
      font-size: 0.85rem;
      width: 0.85rem;
      height: 0.85rem;
      color: var(--color-ink-faint);
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    /* Right column — flex column, starts at top, no centering */
    .hero-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .avatar-wrap {
      position: relative;
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .avatar-ring {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: var(--color-surface);
      border: 3px solid var(--color-border);
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-initials {
      font-family: var(--font-display);
      font-size: 4rem;
      color: var(--color-accent);
      line-height: 1;
      font-style: italic;
    }

    .floating-tag {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 999px;
      padding: 0.35rem 0.85rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-ink);
      box-shadow: var(--shadow-md);
      white-space: nowrap;

      mat-icon {
        font-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
        color: var(--color-accent);
      }
    }

    .tag-1 {
      top: -12px;
      right: -32px;
      animation: float1 4s ease-in-out infinite;
    }

    .tag-2 {
      bottom: -12px;
      left: -32px;
      animation: float2 5s ease-in-out infinite;
    }

    @keyframes float1 {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @keyframes float2 {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      width: 100%;
    }

    .stat-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      transition: box-shadow var(--transition), transform var(--transition);

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }
    }

    .stat-value {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--color-accent);
      line-height: 1;
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--color-ink-muted);
      line-height: 1.4;
    }

    /* Scroll hint */
    .scroll-hint {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-ink-faint);
      animation: bounce 2.5s ease-in-out infinite;

      mat-icon { font-size: 1.1rem; width: 1.1rem; height: 1.1rem; }
    }

    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(6px); }
    }

    @media (max-width: 960px) {
      .hero-inner {
        grid-template-columns: 1fr;
        gap: 3rem;
        justify-items: center;
        text-align: center;
      }

      .hero-content { max-width: 100%; }
      .hero-details, .hero-actions { justify-content: center; }
      .contact-links { max-width: 420px; margin-left: auto; margin-right: auto; }
      .hero-right { width: 100%; max-width: 420px; }
    }

    @media (max-width: 480px) {
      .avatar-wrap { display: none; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly portfolio = inject(PortfolioService);

  readonly stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '25%', label: 'Borrower Data Reduction' },
    { value: '125+', label: 'Angular CoP Members' },
    { value: '20+', label: 'Tech Presentations Given' },
  ];

  get initials(): string {
    return this.portfolio.name
      .split(' ')
      .map(n => n[0])
      .join('');
  }
}