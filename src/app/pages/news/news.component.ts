import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { ContentService } from '../../core/services/content.service';
import { NewsArticle } from '../../core/models/content.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, PageBannerComponent],
  template: `
    <app-page-banner eyebrow="News Portal" title="News, Events & Shows"
      subtitle="Stay up to date with the latest happenings across the CAWAB community."></app-page-banner>

    <section class="section">
      <div class="container">
        <div class="tabs">
          <button *ngFor="let t of tabs" class="tab" [class.active]="active() === t" (click)="active.set(t)">{{ t }}</button>
        </div>

        <div class="featured card" *ngIf="featured() as f">
          <span class="chip chip--gold">Featured · {{ f.type }}</span>
          <h2>{{ f.title }}</h2>
          <p>{{ f.excerpt }}</p>
          <small>{{ f.date | date:'mediumDate' }}</small>
        </div>

        <div class="news-grid">
          <article class="news card" *ngFor="let a of rest()">
            <div class="news__img" [style.background]="color(a.type)">{{ a.type }}</div>
            <div class="news__body">
              <span class="chip chip--green">{{ a.type }}</span>
              <h3>{{ a.title }}</h3>
              <p>{{ a.excerpt }}</p>
              <small>{{ a.date | date:'mediumDate' }}</small>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tabs { display: flex; gap: 10px; margin-bottom: 26px; flex-wrap: wrap; }
    .tab { padding: 9px 20px; border-radius: 30px; border: 1.5px solid var(--line); background: var(--card); font-weight: 500; color: var(--muted); }
    .tab.active { background: var(--cawab-green); color: #fff; border-color: var(--cawab-green); }
    .featured { padding: 32px; margin-bottom: 28px; border-left: 5px solid var(--cawab-gold); }
    .featured h2 { font-size: 26px; margin: 12px 0 10px; color: var(--ink); }
    .featured p { color: var(--muted); font-size: 16px; margin-bottom: 8px; }
    .featured small { color: var(--cawab-green); font-weight: 600; }
    .news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .news { overflow: hidden; transition: transform .15s ease, box-shadow .15s ease; }
    .news:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
    .news__img { height: 140px; display: grid; place-items: center; color: rgba(255,255,255,.85); font-weight: 700; font-size: 18px; letter-spacing: 1px; }
    .news__body { padding: 20px; }
    .news__body h3 { font-size: 17px; margin: 10px 0 8px; }
    .news__body p { font-size: 14px; color: var(--muted); margin-bottom: 10px; }
    .news__body small { color: var(--cawab-green); font-weight: 600; }
    @media (max-width: 900px) { .news-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 580px) { .news-grid { grid-template-columns: 1fr; } }
  `]
})
export class NewsComponent {
  private content = inject(ContentService);
  private all = signal<NewsArticle[]>([]);
  active = signal<'All' | 'News' | 'Event' | 'Show'>('All');
  tabs: ('All' | 'News' | 'Event' | 'Show')[] = ['All', 'News', 'Event', 'Show'];

  private list = computed(() => {
    const a = this.active();
    return a === 'All' ? this.all() : this.all().filter((n) => n.type === a);
  });
  featured = computed(() => this.list().find((n) => n.featured) || this.list()[0]);
  rest = computed(() => this.list().filter((n) => n !== this.featured()));

  ngOnInit() { this.content.getNews().subscribe((n) => this.all.set(n)); }

  color(type: string): string {
    return type === 'Event' ? '#c8232c' : type === 'Show' ? '#d99a06' : '#0d5132';
  }
}
