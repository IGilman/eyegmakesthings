import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-experience',
  imports: [MatIconModule, MatExpansionModule],
  template: `
    <section id="experience" aria-labelledby="experience-heading" class="section experience-section">
      <div class="container">

        <div class="section-header">
          <span class="section-eyebrow">Career</span>
          <h2 id="experience-heading" class="section-title">Work Experience</h2>
          <p class="section-subtitle">A decade of shipping software, leading teams, and growing communities.</p>
        </div>

        <mat-accordion [multi]="true" class="experience-accordion">

          <!-- Professional Experience Panel -->
          <mat-expansion-panel class="experience-panel" [expanded]="false" hideToggle>
            <mat-expansion-panel-header class="panel-header">
              <div class="panel-header-inner">
                <div class="panel-title-group">
                  <mat-icon class="panel-icon" aria-hidden="true">work</mat-icon>
                  <span class="panel-title">Professional Experience</span>
                  <span class="panel-count">{{ portfolio.experiences.length }} roles</span>
                </div>
                <mat-icon class="expand-icon" aria-hidden="true">expand_more</mat-icon>
              </div>
            </mat-expansion-panel-header>

            <ol class="timeline" aria-label="Professional work experience timeline">
              @for (exp of portfolio.experiences; track exp.role + exp.period; let i = $index) {
                <li class="timeline-item" [class.current]="exp.current">
                  <div class="timeline-marker" aria-hidden="true">
                    <div class="marker-dot" [class.marker-dot--active]="exp.current">
                      @if (exp.current) {
                        <mat-icon>radio_button_checked</mat-icon>
                      } @else {
                        <mat-icon>radio_button_unchecked</mat-icon>
                      }
                    </div>
                    @if (i < portfolio.experiences.length - 1) {
                      <div class="marker-line"></div>
                    }
                  </div>

                  <div class="entry">
                    <div class="entry-header">
                      <div class="entry-meta">
                        <h3 class="entry-role">{{ exp.role }}</h3>
                        <p class="entry-company">
                          <mat-icon aria-hidden="true">business</mat-icon>
                          {{ exp.company }}
                        </p>
                      </div>
                      <div class="entry-info">
                        <span class="entry-period">
                          <mat-icon aria-hidden="true">calendar_today</mat-icon>
                          {{ exp.period }}
                        </span>
                        <span class="entry-location">
                          <mat-icon aria-hidden="true">location_on</mat-icon>
                          {{ exp.location }}
                        </span>
                        @if (exp.current) {
                          <span class="current-badge">Current</span>
                        }
                      </div>
                    </div>
                    <ul class="bullet-list" [attr.aria-label]="exp.role + ' responsibilities'">
                      @for (bullet of exp.bullets; track bullet) {
                        <li class="bullet-item">
                          <mat-icon aria-hidden="true">arrow_right</mat-icon>
                          <span>{{ bullet }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
              }
            </ol>
          </mat-expansion-panel>

          <!-- Additional Experience Panel -->
          <mat-expansion-panel class="experience-panel" [expanded]="false" hideToggle>
            <mat-expansion-panel-header class="panel-header">
              <div class="panel-header-inner">
                <div class="panel-title-group">
                  <mat-icon class="panel-icon" aria-hidden="true">star_outline</mat-icon>
                  <span class="panel-title">Additional Experience</span>
                  <span class="panel-count">{{ portfolio.additionalExperiences.length }} roles</span>
                </div>
                <mat-icon class="expand-icon" aria-hidden="true">expand_more</mat-icon>
              </div>
            </mat-expansion-panel-header>

            <ol class="timeline" aria-label="Additional experience timeline">
              @for (exp of portfolio.additionalExperiences; track exp.role + exp.period; let i = $index) {
                <li class="timeline-item">
                  <div class="timeline-marker" aria-hidden="true">
                    <div class="marker-dot">
                      <mat-icon>radio_button_unchecked</mat-icon>
                    </div>
                    @if (i < portfolio.additionalExperiences.length - 1) {
                      <div class="marker-line"></div>
                    }
                  </div>

                  <div class="entry">
                    <div class="entry-header">
                      <div class="entry-meta">
                        <h3 class="entry-role">{{ exp.role }}</h3>
                        <p class="entry-company">
                          <mat-icon aria-hidden="true">business</mat-icon>
                          {{ exp.company }}
                        </p>
                      </div>
                      <div class="entry-info">
                        <span class="entry-period">
                          <mat-icon aria-hidden="true">calendar_today</mat-icon>
                          {{ exp.period }}
                        </span>
                        <span class="entry-location">
                          <mat-icon aria-hidden="true">location_on</mat-icon>
                          {{ exp.location }}
                        </span>
                      </div>
                    </div>
                    <ul class="bullet-list" [attr.aria-label]="exp.role + ' responsibilities'">
                      @for (bullet of exp.bullets; track bullet) {
                        <li class="bullet-item">
                          <mat-icon aria-hidden="true">arrow_right</mat-icon>
                          <span>{{ bullet }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
              }
            </ol>
          </mat-expansion-panel>

        </mat-accordion>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      background: var(--color-bg);
    }

    .section-header {
      margin-bottom: 2.5rem;
    }

    .experience-accordion {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Panel */
    .experience-panel {
      border: 1px solid var(--color-border) !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: var(--shadow-sm) !important;
      background: var(--color-surface) !important;
      transition: box-shadow var(--transition) !important;

      &.mat-expanded {
        box-shadow: var(--shadow-md) !important;
      }
    }

    ::ng-deep .experience-accordion .mat-expansion-panel-header {
      padding: 0 !important;
      height: auto !important;
      min-height: unset !important;
      &:hover { background: transparent !important; }
    }

    ::ng-deep .experience-accordion .mat-expansion-panel-body {
      padding: 1.5rem 2rem 2rem !important;
    }

    ::ng-deep .experience-accordion .mat-expanded .expand-icon {
      transform: rotate(180deg);
    }

    /* Panel header */
    .panel-header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.75rem;
      width: 100%;
      gap: 1rem;
    }

    .panel-title-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .panel-icon {
      color: var(--color-accent);
      font-size: 1.3rem;
      width: 1.3rem;
      height: 1.3rem;
    }

    .panel-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      color: var(--color-ink);
    }

    .panel-count {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--color-ink-faint);
      background: var(--color-surface-alt);
      border: 1px solid var(--color-border);
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
    }

    .expand-icon {
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
      color: var(--color-ink-faint);
      transition: transform var(--transition);
      flex-shrink: 0;
    }

    /* Timeline inside panel */
    .timeline {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 1.25rem;
      padding-bottom: 2rem;

      &:last-child { padding-bottom: 0; }

      &.current .marker-dot mat-icon {
        color: var(--color-accent);
      }
    }

    .timeline-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.15rem;
    }

    .marker-dot {
      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--color-ink-faint);
        display: block;
      }

      &--active mat-icon { color: var(--color-accent); }
    }

    .marker-line {
      flex: 1;
      width: 2px;
      background: var(--color-border);
      margin-top: 0.35rem;
    }

    /* Entry */
    .entry {
      padding-bottom: 0.5rem;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.85rem;
      flex-wrap: wrap;
    }

    .entry-role {
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: var(--color-ink);
      margin-bottom: 0.25rem;
    }

    .entry-company {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-accent);

      mat-icon {
        font-size: 0.9rem;
        width: 0.9rem;
        height: 0.9rem;
      }
    }

    .entry-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.3rem;
      flex-shrink: 0;
    }

    .entry-period,
    .entry-location {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.8rem;
      color: var(--color-ink-muted);
      white-space: nowrap;

      mat-icon {
        font-size: 0.85rem;
        width: 0.85rem;
        height: 0.85rem;
      }
    }

    .current-badge {
      display: inline-block;
      background: var(--color-accent-light);
      color: var(--color-accent);
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
    }

    .bullet-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      list-style: none;
      padding: 0;
    }

    .bullet-item {
      display: flex;
      align-items: flex-start;
      gap: 0.35rem;
      font-size: 0.9rem;
      color: var(--color-ink-muted);
      line-height: 1.6;

      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--color-accent);
        margin-top: 0.1rem;
        flex-shrink: 0;
      }
    }

    @media (max-width: 768px) {
      .entry-location { display: none; }

      ::ng-deep .experience-accordion .mat-expansion-panel-body {
        padding: 1.25rem 1.25rem 1.5rem !important;
      }
    }

    @media (max-width: 600px) {
      .entry-header {
        flex-direction: column;
        gap: 0.5rem;
      }

      .entry-info { align-items: flex-start; }

      .timeline-item {
        grid-template-columns: 32px 1fr;
        gap: 0.75rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly portfolio = inject(PortfolioService);
}