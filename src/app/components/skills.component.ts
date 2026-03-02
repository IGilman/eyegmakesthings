import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../portfolio.service';

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: 'web',
  Backend: 'storage',
  'Tools & Platforms': 'build',
  Practices: 'psychology',
};

@Component({
  selector: 'app-skills',
  imports: [MatIconModule],
  template: `
    <section id="skills" aria-labelledby="skills-heading" class="section skills-section">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Expertise</span>
          <h2 id="skills-heading" class="section-title">Skills & Technologies</h2>
          <p class="section-subtitle">The tools and practices I work with every day.</p>
        </div>

        <div class="skills-grid" role="list">
          @for (group of portfolio.skillGroups; track group.category) {
            <div class="skill-group" role="listitem">
              <div class="group-header">
                <div class="group-icon" aria-hidden="true">
                  <mat-icon>{{ getCategoryIcon(group.category) }}</mat-icon>
                </div>
                <h3 class="group-title">{{ group.category }}</h3>
              </div>

              <ul class="skill-list" [attr.aria-label]="group.category + ' skills'">
                @for (skill of group.skills; track skill) {
                  <li class="skill-pill">{{ skill }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      background: var(--color-bg);
    }

    .section-header {
      margin-bottom: 3rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }

    .skill-group {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      box-shadow: var(--shadow-sm);
      transition: box-shadow var(--transition), transform var(--transition);

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }
    }

    .group-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .group-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: var(--color-accent-light);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        color: var(--color-accent);
        font-size: 1.2rem;
        width: 1.2rem;
        height: 1.2rem;
      }
    }

    .group-title {
      font-family: var(--font-display);
      font-size: 1.1rem;
      color: var(--color-ink);
    }

    .skill-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      list-style: none;
      padding: 0;
    }

    .skill-pill {
      display: inline-block;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      color: var(--color-ink-muted);
      font-size: 0.82rem;
      font-weight: 400;
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      transition: background var(--transition), color var(--transition), border-color var(--transition);

      &:hover {
        background: var(--color-accent-light);
        color: var(--color-accent);
        border-color: var(--color-accent);
      }
    }

    @media (max-width: 640px) {
      .skills-grid { grid-template-columns: 1fr; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly portfolio = inject(PortfolioService);

  getCategoryIcon(category: string): string {
    return CATEGORY_ICONS[category] ?? 'star';
  }
}