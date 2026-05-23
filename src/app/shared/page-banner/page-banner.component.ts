import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Reusable gradient banner shown at the top of inner pages. */
@Component({
  selector: 'app-page-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="banner">
      <div class="container">
        <span class="banner__eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
        <h1>{{ title }}</h1>
        <p *ngIf="subtitle">{{ subtitle }}</p>
      </div>
    </section>
  `,
  styles: [`
    .banner {
      background: linear-gradient(135deg, var(--cawab-green) 0%, var(--cawab-green-dark) 100%);
      border-bottom: 3px solid var(--cawab-gold); color: #fff; padding: 124px 0 56px;
    }
    .banner__eyebrow {
      display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: var(--cawab-gold); margin-bottom: 8px;
    }
    .banner h1 { font-size: clamp(28px, 4.5vw, 42px); margin-bottom: 8px; }
    .banner p { opacity: .85; max-width: 700px; font-size: 16px; }
  `]
})
export class PageBannerComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() eyebrow = '';
}
