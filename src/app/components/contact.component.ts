import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  template: `
    <section id="contact" aria-labelledby="contact-heading" class="section contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Left: info -->
          <div class="contact-info">
            <span class="section-eyebrow">Contact</span>
            <h2 id="contact-heading" class="section-title">Let's Connect</h2>
            <p class="contact-intro">
              I'm always open to interesting conversations, new opportunities,
              or collaborating on something great. Drop me a message!
            </p>

            <div class="contact-details" role="list" aria-label="Contact methods">
              @for (link of portfolio.socialLinks; track link.label) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-link"
                  role="listitem"
                  [attr.aria-label]="link.label + ' (opens in new tab)'"
                >
                  <span class="contact-link-icon" aria-hidden="true">
                    <mat-icon>{{ link.icon }}</mat-icon>
                  </span>
                  <span class="contact-link-text">{{ link.label }}</span>
                  <mat-icon class="contact-link-arrow" aria-hidden="true">arrow_forward</mat-icon>
                </a>
              }
            </div>
          </div>

          <!-- Right: form -->
          <div class="contact-form-wrap">
            <form
              [formGroup]="contactForm"
              (ngSubmit)="onSubmit()"
              class="contact-form"
              novalidate
              aria-label="Contact form"
            >
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Your Name</mat-label>
                  <input
                    matInput
                    formControlName="name"
                    placeholder="Jane Smith"
                    autocomplete="name"
                    aria-required="true"
                  />
                  <mat-icon matPrefix aria-hidden="true">person</mat-icon>
                  @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                    <mat-error>Name is required</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email Address</mat-label>
                  <input
                    matInput
                    formControlName="email"
                    type="email"
                    placeholder="jane@example.com"
                    autocomplete="email"
                    aria-required="true"
                  />
                  <mat-icon matPrefix aria-hidden="true">mail</mat-icon>
                  @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                    <mat-error>
                      @if (contactForm.get('email')?.errors?.['required']) {
                        Email is required
                      } @else {
                        Please enter a valid email
                      }
                    </mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Subject</mat-label>
                  <input
                    matInput
                    formControlName="subject"
                    placeholder="What's this about?"
                    aria-required="true"
                  />
                  <mat-icon matPrefix aria-hidden="true">subject</mat-icon>
                  @if (contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched) {
                    <mat-error>Subject is required</mat-error>
                  }
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Message</mat-label>
                  <textarea
                    matInput
                    formControlName="message"
                    placeholder="Tell me about your project or idea..."
                    rows="5"
                    aria-required="true"
                  ></textarea>
                  @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                    <mat-error>
                      @if (contactForm.get('message')?.errors?.['required']) {
                        Message is required
                      } @else {
                        Message must be at least 20 characters
                      }
                    </mat-error>
                  }
                </mat-form-field>
              </div>

              <button
                mat-raised-button
                color="primary"
                type="submit"
                class="submit-btn"
                [disabled]="submitting()"
                aria-label="Send message"
              >
                @if (submitting()) {
                  Sending…
                } @else {
                  <ng-container>
                    <mat-icon>send</mat-icon>
                    Send Message
                  </ng-container>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background: var(--color-bg);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 5rem;
      align-items: start;
    }

    .contact-intro {
      font-size: 1rem;
      font-weight: 300;
      color: var(--color-ink-muted);
      line-height: 1.75;
      margin-bottom: 2.5rem;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .contact-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.9rem 1.1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      text-decoration: none;
      color: var(--color-ink);
      transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);

      &:hover {
        border-color: var(--color-accent);
        box-shadow: var(--shadow-sm);
        transform: translateX(4px);

        .contact-link-icon { background: var(--color-accent); }
        .contact-link-icon mat-icon { color: #fff; }
        .contact-link-arrow { color: var(--color-accent); opacity: 1; }
      }
    }

    .contact-link-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      background: var(--color-accent-light);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background var(--transition);

      mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--color-accent);
        transition: color var(--transition);
      }
    }

    .contact-link-text {
      flex: 1;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .contact-link-arrow {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: var(--color-ink-faint);
      opacity: 0;
      transition: color var(--transition), opacity var(--transition);
    }

    /* Form */
    .contact-form-wrap {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2.5rem;
      box-shadow: var(--shadow-sm);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .form-row { width: 100%; }
    .full-width { width: 100%; }

    .submit-btn {
      margin-top: 0.5rem;
      align-self: flex-start;

      mat-icon { margin-right: 0.4rem; }
    }

    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    @media (max-width: 480px) {
      .contact-form-wrap {
        padding: 1.5rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly portfolio = inject(PortfolioService);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly submitting = signal(false);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    // Simulate async send — wire up to a real endpoint or EmailJS later
    setTimeout(() => {
      this.submitting.set(false);
      this.contactForm.reset();
      this.snackBar.open("Message sent! I'll be in touch soon.", 'Dismiss', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }, 1500);
  }
}
