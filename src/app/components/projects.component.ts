import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-projects',
  imports: [MatButtonModule, MatIconModule, MatChipsModule, MatCardModule],
  template: `
    <section id="projects" aria-labelledby="projects-heading" class="section projects-section">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Portfolio</span>
          <h2 id="projects-heading" class="section-title">Featured Projects</h2>
          <p class="section-subtitle">Things I've designed, built, and shipped.</p>
        </div>

        <div class="projects-grid" role="list">
          @for (project of portfolio.projects; track project.name) {
            <mat-card
              class="project-card"
              role="listitem"
              [attr.aria-label]="project.name + ' project'"
            >
              <mat-card-content>

                <!-- Logo area -->
                <div class="logo-area" [class.logo-area--dark]="project.logoDark">
                  @if (project.logo) {
                    <img
                      [src]="project.logo"
                      [alt]="project.name + ' logo'"
                      class="project-logo"
                    />
                  } @else {
                    <div class="logo-initials" aria-hidden="true">
                      {{ project.logoInitials ?? project.name.charAt(0) }}
                    </div>
                  }
                </div>

                <!-- Body -->
                <div class="card-body">
                  <h3 class="project-name">{{ project.name }}</h3>
                  <p class="project-description">{{ project.description }}</p>

                  <mat-chip-set aria-label="Technologies used" class="chip-set">
                    @for (tag of project.tags; track tag) {
                      <mat-chip>{{ tag }}</mat-chip>
                    }
                  </mat-chip-set>
                </div>

                <!-- Footer actions -->
                <div class="card-footer">
                  @if (project.link) {
                    <a
                      mat-raised-button
                      color="primary"
                      [href]="project.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      [attr.aria-label]="'Visit ' + project.name + ' (opens in new tab)'"
                      class="visit-btn"
                    >
                      <mat-icon>open_in_new</mat-icon>
                      Visit Site
                    </a>
                  } @else {
                    <button mat-stroked-button disabled class="visit-btn" aria-label="Link coming soon">
                      <mat-icon>schedule</mat-icon>
                      Coming Soon
                    </button>
                  }

                  @if (project.github) {
                    <a
                      mat-icon-button
                      [href]="project.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      [attr.aria-label]="project.name + ' GitHub repository (opens in new tab)'"
                    >
                      <mat-icon>code</mat-icon>
                    </a>
                  }
                </div>

              </mat-card-content>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      background: var(--color-surface);
    }

    .section-header {
      margin-bottom: 3rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 1.75rem;
    }

    .project-card {
      display: flex;
      flex-direction: column;
      padding: 0 !important;
      overflow: hidden;
      transition: box-shadow var(--transition), transform var(--transition) !important;

      &:hover {
        transform: translateY(-5px) !important;
        box-shadow: var(--shadow-lg) !important;
      }

      mat-card-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 !important;
        margin: 0 !important;
      }
    }

    /* Logo area */
    .logo-area {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 120px;
      padding: 1.5rem 2rem;
      background: #ffffff;
      border-bottom: 1px solid var(--color-border);
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
      overflow: hidden;
    }

    .project-logo {
      max-width: 100%;
      max-height: 60px;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      mix-blend-mode: multiply;
    }

    .logo-initials {
      font-family: var(--font-display);
      font-size: 2.5rem;
      color: var(--color-accent);
      font-style: italic;
      line-height: 1;
      user-select: none;
    }

    /* Card body */
    .card-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 1.5rem 1.75rem 1rem;
    }

    .project-name {
      font-family: var(--font-display);
      font-size: 1.2rem;
      color: var(--color-ink);
      margin-bottom: 0.6rem;
      line-height: 1.2;
    }

    .project-description {
      font-size: 0.9rem;
      font-weight: 300;
      color: var(--color-ink-muted);
      line-height: 1.65;
      margin-bottom: 1.25rem;
      flex: 1;
    }

    .chip-set {
      margin-bottom: 0.25rem;
    }

    /* Card footer */
    .card-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 1.75rem 1.5rem;
      border-top: 1px solid var(--color-border);
      margin-top: 0.75rem;
    }

    .visit-btn {
      flex: 1;

      mat-icon {
        margin-right: 0.35rem;
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
    }

    @media (max-width: 640px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly portfolio = inject(PortfolioService);
}