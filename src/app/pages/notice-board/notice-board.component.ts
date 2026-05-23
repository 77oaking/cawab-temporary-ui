import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { ContentService } from '../../core/services/content.service';
import { Notice } from '../../core/models/content.model';

@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [CommonModule, PageBannerComponent],
  template: `
    <app-page-banner eyebrow="Announcements" title="Notice Board"
      subtitle="Official announcements, circulars and updates from CAWAB."></app-page-banner>

    <section class="section">
      <div class="container">
        <div class="filters">
          <button *ngFor="let c of cats" class="filter" [class.active]="active() === c" (click)="active.set(c)">{{ c }}</button>
        </div>

        <div class="notice-list">
          <article class="notice card" *ngFor="let n of filtered()" [class.pinned]="n.pinned">
            <div class="notice__meta">
              <span class="notice__date">{{ n.date | date:'fullDate' }}</span>
              <span class="chip chip--green">{{ n.category }}</span>
              <span class="chip chip--gold" *ngIf="n.pinned">📌 Pinned</span>
            </div>
            <h3>{{ n.title }}</h3>
            <p>{{ n.body }}</p>
            <a *ngIf="n.attachmentUrl" [href]="n.attachmentUrl" class="notice__att">📎 Attachment</a>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
    .filter { padding: 8px 16px; border-radius: 30px; border: 1.5px solid var(--line); background: var(--card); font-size: 14px; font-weight: 500; color: var(--muted); }
    .filter.active { background: var(--cawab-green); color: #fff; border-color: var(--cawab-green); }
    .notice-list { display: flex; flex-direction: column; gap: 16px; }
    .notice { padding: 24px; border-left: 4px solid var(--line); }
    .notice.pinned { border-left-color: var(--cawab-gold); }
    .notice__meta { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
    .notice__date { font-size: 13px; color: var(--cawab-red); font-weight: 600; }
    .notice h3 { font-size: 18px; margin-bottom: 8px; color: var(--ink); }
    .notice p { color: var(--muted); font-size: 15px; }
    .notice__att { display: inline-block; margin-top: 10px; color: var(--cawab-green); font-weight: 600; font-size: 14px; }
  `]
})
export class NoticeBoardComponent {
  private content = inject(ContentService);
  private all = signal<Notice[]>([]);
  active = signal<string>('All');
  cats = ['All', 'General', 'Academic', 'Event', 'Urgent'];

  filtered = computed(() => {
    const list = [...this.all()].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || +new Date(b.date) - +new Date(a.date));
    return this.active() === 'All' ? list : list.filter((n) => n.category === this.active());
  });

  ngOnInit() { this.content.getNotices().subscribe((n) => this.all.set(n)); }
}
