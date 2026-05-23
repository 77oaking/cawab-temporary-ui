import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Admin placeholder. The full admin panel (notice/news/gallery management,
 * membership approval, institution CRUD, department assignment) lands in
 * Phase 2 alongside the Next.js + MongoDB backend and authentication.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="admin">
      <div class="container">
        <div class="card admin__card">
          <div class="admin__badge">🔒 Phase 2</div>
          <h1>Admin Panel — Coming Soon</h1>
          <p>The CAWAB administration dashboard will be built in Phase 2 together with the secure API and database. Planned capabilities include:</p>
          <div class="admin__grid">
            <div class="feat" *ngFor="let f of features">
              <span class="feat__ic">{{ f.icon }}</span>
              <span>{{ f.label }}</span>
            </div>
          </div>
          <a routerLink="/" class="btn btn--green">← Back to Home</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .admin { padding: 80px 0; min-height: 60vh; display: grid; place-items: center; }
    .admin__card { padding: 48px; text-align: center; max-width: 680px; }
    .admin__badge { display: inline-block; background: var(--cawab-gold-soft); color: var(--cawab-gold-dark); font-weight: 700; padding: 5px 16px; border-radius: 30px; font-size: 13px; margin-bottom: 16px; }
    .admin h1 { color: var(--cawab-green); margin-bottom: 14px; }
    .admin p { color: var(--muted); margin-bottom: 26px; }
    .admin__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 30px; text-align: left; }
    .feat { display: flex; align-items: center; gap: 10px; background: var(--surface); padding: 14px; border-radius: 10px; font-size: 14px; font-weight: 500; }
    .feat__ic { font-size: 20px; }
    @media (max-width: 620px) { .admin__grid { grid-template-columns: 1fr; } .admin__card { padding: 32px 22px; } }
  `]
})
export class AdminComponent {
  features = [
    { icon: '📢', label: 'Manage Notices' },
    { icon: '📰', label: 'Publish News & Events' },
    { icon: '🖼', label: 'Gallery Uploads' },
    { icon: '✅', label: 'Approve Memberships' },
    { icon: '🏫', label: 'Institution CRUD' },
    { icon: '👥', label: 'Assign Officers' }
  ];
}
