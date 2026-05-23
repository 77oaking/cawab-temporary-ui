import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { ContentService } from '../../core/services/content.service';
import { GalleryItem } from '../../core/models/content.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, PageBannerComponent],
  template: `
    <app-page-banner eyebrow="Memories" title="Gallery"
      subtitle="Moments from CAWAB events, relief drives, cultural shows and gatherings."></app-page-banner>

    <section class="section">
      <div class="container">
        <div class="albums">
          <button *ngFor="let a of albums" class="album" [class.active]="active() === a" (click)="active.set(a)">{{ a }}</button>
        </div>

        <div class="masonry">
          <figure class="tile" *ngFor="let g of filtered()" [style.background]="g.image" (click)="open(g)">
            <figcaption>{{ g.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <div class="lightbox" *ngIf="selected()" (click)="selected.set(null)">
      <div class="lightbox__inner" [style.background]="selected()!.image">
        <span>{{ selected()!.caption }}</span>
        <button class="lightbox__close" (click)="selected.set(null)">×</button>
      </div>
    </div>
  `,
  styles: [`
    .albums { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
    .album { padding: 8px 18px; border-radius: 30px; border: 1.5px solid var(--line); background: var(--card); font-weight: 500; color: var(--muted); }
    .album.active { background: var(--cawab-green); color: #fff; border-color: var(--cawab-green); }
    .masonry { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .tile { height: 200px; border-radius: var(--radius); position: relative; cursor: pointer; overflow: hidden; display: flex; align-items: flex-end; transition: transform .15s ease; }
    .tile:hover { transform: scale(1.02); }
    .tile figcaption { background: linear-gradient(transparent, rgba(0,0,0,.7)); color: #fff; width: 100%; padding: 16px 14px 12px; font-size: 14px; font-weight: 500; }
    .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,.8); display: grid; place-items: center; z-index: 200; padding: 24px; }
    .lightbox__inner { width: min(700px, 90vw); height: min(450px, 70vh); border-radius: 16px; display: grid; place-items: center; position: relative; color: #fff; font-size: 22px; font-weight: 600; }
    .lightbox__close { position: absolute; top: 12px; right: 18px; color: #fff; font-size: 34px; line-height: 1; }
    @media (max-width: 900px) { .masonry { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .masonry { grid-template-columns: 1fr; } }
  `]
})
export class GalleryComponent {
  private content = inject(ContentService);
  private all = signal<GalleryItem[]>([]);
  active = signal<string>('All');
  selected = signal<GalleryItem | null>(null);
  albums = ['All', 'Events', 'Shows', 'Relief', 'Meetings'];

  filtered = computed(() => this.active() === 'All' ? this.all() : this.all().filter((g) => g.album === this.active()));

  ngOnInit() { this.content.getGallery().subscribe((g) => this.all.set(g)); }
  open(g: GalleryItem) { this.selected.set(g); }
}
