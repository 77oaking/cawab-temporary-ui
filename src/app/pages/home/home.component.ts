import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { LeadershipService } from '../../core/services/leadership.service';
import { InstitutionService } from '../../core/services/institution.service';
import { NewsArticle, Notice, GalleryItem, Merchandise, AdBanner } from '../../core/models/content.model';
import { Leader } from '../../core/models/leadership.model';
import { InstitutionCategory } from '../../core/models/institution.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  i18n = inject(I18nService);
  private content = inject(ContentService);
  private leadership = inject(LeadershipService);
  private institutions = inject(InstitutionService);

  notices: Notice[] = [];
  news: NewsArticle[] = [];
  gallery: GalleryItem[] = [];
  merch: Merchandise[] = [];
  ad?: AdBanner;
  chairman?: Leader;
  instCats: { category: InstitutionCategory; count: number }[] = [];

  /** Impact stats shown on the gold bar under the hero. */
  stats = [
    { icon: 'users', value: '1000+', label: 'Students Impacted' },
    { icon: 'handshake', value: '20+', label: 'Initiatives' },
    { icon: 'target', value: '1 Vision', label: 'Stronger Cantonment Community' }
  ];

  /** Horizontal journey timeline in the Overview section. */
  journey = [
    { icon: 'calendar', title: '28 Aug 2020', text: 'Founded during the COVID-19 pandemic' },
    { icon: 'people', title: 'Founded by', text: 'Md Shakawat Hossen HCPSC, Wasif Ahmad Chowdhury HCPSC, Mohammed Sadman Sakib Chowdhury CCPC' },
    { icon: 'handshake', title: 'Started as', text: 'Bangladesh Cantonment College Community (BCCC)' },
    { icon: 'chart', title: 'Today', text: 'Continuing our mission to empower and develop students' }
  ];

  private categoryOrder: InstitutionCategory[] = [
    'Cantonment Public', 'Cantonment Board', 'Cantonment English', 'BN College', 'BAF Shaheen'
  ];

  ngOnInit() {
    this.content.getNotices().subscribe((n) => (this.notices = n.slice(0, 4)));
    this.content.getNews().subscribe((a) => (this.news = a.slice(0, 3)));
    this.content.getGallery().subscribe((g) => (this.gallery = g.slice(0, 6)));
    this.content.getMerchandise().subscribe((m) => (this.merch = m));
    this.content.getAds().subscribe((a) => (this.ad = a[0]));
    this.leadership.getByCouncil('Central Executive')
      .subscribe((l) => (this.chairman = l.find((x) => x.role === 'Chairman')));
    this.institutions.getAll().subscribe((list) => {
      this.instCats = this.categoryOrder.map((category) => ({
        category,
        count: list.filter((i) => i.category === category).length
      }));
    });
  }

  initials(name: string): string {
    return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  }
}
