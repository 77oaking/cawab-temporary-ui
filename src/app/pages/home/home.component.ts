import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { ContentService } from '../../core/services/content.service';
import { LeadershipService } from '../../core/services/leadership.service';
import { Notice, NewsArticle } from '../../core/models/content.model';
import { Leader } from '../../core/models/leadership.model';

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

  notices: Notice[] = [];
  news: NewsArticle[] = [];
  chairman?: Leader;

  stats = [
    { value: '110+', label: 'Member Institutions' },
    { value: '17', label: 'Departments' },
    { value: '1000+', label: 'Cantonmentians' },
    { value: '5', label: 'Force Branches' }
  ];

  timeline = [
    { year: '2020', title: 'Founded', text: 'Established as Bangladesh Cantonment College Community on 28 August 2020.' },
    { year: '2021', title: 'Expanded', text: 'Renamed Bangladesh Cantonment Students’ Community (BCSC) — grew to 96 institutions.' },
    { year: '2025', title: 'Unified', text: 'Navy & Air Force colleges added; renamed CAWAB in July 2025.' },
    { year: 'Today', title: 'Growing', text: 'A nationwide platform uniting all cantonment-affiliated students & alumni.' }
  ];

  ngOnInit() {
    this.content.getNotices().subscribe((n) => (this.notices = n.slice(0, 4)));
    this.content.getNews().subscribe((a) => (this.news = a.slice(0, 3)));
    this.leadership.getByCouncil('Central Executive').subscribe((l) => (this.chairman = l.find((x) => x.role === 'Chairman')));
  }
}
