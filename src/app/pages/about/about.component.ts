import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { LeadershipService } from '../../core/services/leadership.service';
import { Leader } from '../../core/models/leadership.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PageBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private leadership = inject(LeadershipService);

  founders: Leader[] = [];
  advisory: Leader[] = [];
  executive: Leader[] = [];

  designations = [
    { group: 'Central Board', roles: ['Chief Advisor', 'Chairman', 'Senior Vice Chairman', 'Vice Chairman', 'Secretary General', 'Senior Joint Secretary General', 'Joint Secretary General', 'Organizing Secretary', 'Treasurer', 'Senior Joint Organizing Secretary', 'Joint Organizing Secretary', 'Assistant Treasurer', 'Secretary of Office', 'Joint Secretary of Office', 'Department Secretary', 'Department Joint Secretary'] },
    { group: 'Director Board', roles: ['Director', 'Deputy Director', 'Senior Assistant Director', 'Assistant Director'] },
    { group: 'Departmental Operations Panel', roles: ['Senior Officer', 'Assistant Senior Officer', 'Assistant Officer', 'Regional Commander', 'Assistant Regional Commander'] }
  ];

  ngOnInit() {
    this.leadership.getByCouncil('Founders').subscribe((l) => (this.founders = l));
    this.leadership.getByCouncil('Advisory').subscribe((l) => (this.advisory = l));
    this.leadership.getByCouncil('Central Executive').subscribe((l) => (this.executive = l));
  }

  initials(name: string): string {
    return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  }
}
