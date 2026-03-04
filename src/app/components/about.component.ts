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

        <!-- Left column -->
        <div class="hero-content">
          <p class="hero-eyebrow fade-up delay-1">
            <span aria-hidden="true">👋</span> Hello, I'm
          </p>
          <h1 id="hero-heading" class="hero-name fade-up delay-2">{{ portfolio.name }}</h1>
          <p class="hero-title fade-up delay-3">{{ portfolio.title }}</p>
          <p class="hero-bio fade-up delay-4">{{ portfolio.bio }}</p>

          <div class="contact-links fade-up delay-5">
            <a [href]="'mailto:' + portfolio.email" class="contact-link">
              <span class="contact-link-icon"><mat-icon>mail</mat-icon></span>
              <span>{{ portfolio.email }}</span>
            </a>
            <a [href]="'tel:' + portfolio.phone" class="contact-link">
              <span class="contact-link-icon"><mat-icon>phone</mat-icon></span>
              <span>{{ portfolio.phone }}</span>
            </a>
            <a href="https://www.linkedin.com/in/isaacgilman/" target="_blank" rel="noopener noreferrer" class="contact-link">
              <span class="contact-link-icon"><mat-icon>link</mat-icon></span>
              <span>LinkedIn</span>
              <mat-icon class="ext-icon">open_in_new</mat-icon>
            </a>
            <a href="https://github.com/igilman" target="_blank" rel="noopener noreferrer" class="contact-link">
              <span class="contact-link-icon"><mat-icon>code</mat-icon></span>
              <span>GitHub</span>
              <mat-icon class="ext-icon">open_in_new</mat-icon>
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

        <!-- Right column -->
        <div class="hero-right">

          <!-- Avatar -->
          <div class="avatar-wrap fade-up delay-2" aria-hidden="true">
            <div class="avatar-ring">
              <img src="IsaacGilman-headshot.png" alt="Isaac Gilman" class="avatar-img" />
            </div>
            <span class="floating-tag tag-1"><mat-icon>code</mat-icon> Full Stack</span>
            <span class="floating-tag tag-2"><mat-icon>groups</mat-icon>Leader & Engineer</span>
          </div>

          <!-- Stats -->
          <div class="stats-grid fade-up delay-4">
            @for (stat of stats; track stat.label) {
              <div class="stat-card">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            }
          </div>

        </div>
      </div>

      <div class="scroll-hint" aria-hidden="true">
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
      padding: 6rem 0 8rem;
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

    /* ── Main grid ── */
    .hero-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
      align-items: stretch;
    }

    /* ── Left column ── */
    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* ── Right column ── */
    .hero-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    .hero-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.95rem;
      color: var(--color-ink-muted);
      margin-bottom: 0.5rem;
    }

    .hero-name {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 4.5vw, 4rem);
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: var(--color-ink);
      margin-bottom: 0.4rem;
    }

    .hero-title {
      font-size: 1.1rem;
      font-weight: 400;
      color: var(--color-accent);
      margin-bottom: 1.5rem;
    }

    .hero-bio {
      font-size: 0.95rem;
      font-weight: 300;
      line-height: 1.8;
      color: var(--color-ink-muted);
      margin-bottom: 1.75rem;
    }

    /* Contact links */
    .contact-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .contact-link {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      text-decoration: none;
      color: var(--color-ink);
      font-size: 0.85rem;
      transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);

      &:hover {
        border-color: var(--color-accent);
        transform: translateY(-2px);
        box-shadow: var(--shadow-sm);

        .contact-link-icon {
          background: var(--color-accent);
          mat-icon { color: #fff; }
        }
      }
    }

    .contact-link-icon {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: var(--color-accent-light);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background var(--transition);

      mat-icon {
        font-size: 0.9rem;
        width: 0.9rem;
        height: 0.9rem;
        color: var(--color-accent);
        transition: color var(--transition);
      }
    }

    .ext-icon {
      font-size: 0.75rem;
      width: 0.75rem;
      height: 0.75rem;
      color: var(--color-ink-faint);
      margin-left: auto;
    }

    .hero-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    /* Avatar */
    .avatar-wrap {
      position: relative;
      width: 220px;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
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

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .avatar-initials {
      font-family: var(--font-display);
      font-size: 3.75rem;
      color: var(--color-accent);
      font-style: italic;
    }

    .floating-tag {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 999px;
      padding: 0.3rem 0.8rem;
      font-size: 0.73rem;
      font-weight: 500;
      color: var(--color-ink);
      box-shadow: var(--shadow-md);
      white-space: nowrap;

      mat-icon {
        font-size: 0.9rem;
        width: 0.9rem;
        height: 0.9rem;
        color: var(--color-accent);
      }
    }

    .tag-1 {
      top: 0;
      right: -24px;
      animation: float1 4s ease-in-out infinite;
    }

    .tag-2 {
      bottom: 0;
      left: -24px;
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
      gap: 0.85rem;
      width: 100%;
    }

    .stat-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      transition: box-shadow var(--transition), transform var(--transition);

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }
    }

    .stat-value {
      font-family: var(--font-display);
      font-size: 2rem;
      color: var(--color-accent);
      line-height: 1;
    }

    .stat-label {
      font-size: 0.78rem;
      color: var(--color-ink-muted);
      line-height: 1.4;
    }

    /* Scroll hint */
    .scroll-hint {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      font-size: 0.68rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-ink-faint);
      animation: bounce 2.5s ease-in-out infinite;

      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }

    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(6px); }
    }

    /* Responsive */
    @media (max-width: 960px) {
      .hero-inner {
        grid-template-columns: 1fr;
        gap: 3rem;
        justify-items: center;
        text-align: center;
      }

      .hero-content { max-width: 560px; }
      .hero-actions { justify-content: center; }
      .contact-links { max-width: 460px; margin: 0 auto 2rem; }
      .hero-right { width: 100%; max-width: 420px; }
    }

    @media (max-width: 560px) {
      .contact-links { grid-template-columns: 1fr; }
      .avatar-wrap { display: none; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly portfolio = inject(PortfolioService);

  readonly stats = [
    { value: '5', label: 'Teams Lead' },
    { value: '12', label: 'Years of Experience' },
    { value: '20', label: 'Applications Deployed' },
    { value: '35', label: 'Tech Presentations Given' },
  ];

  get initials(): string {
    return this.portfolio.name.split(' ').map(n => n[0]).join('');
  }
}