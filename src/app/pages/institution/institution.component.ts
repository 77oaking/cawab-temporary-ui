import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { InstitutionService } from '../../core/services/institution.service';
import { Institution, InstitutionCategory } from '../../core/models/institution.model';

@Component({
  selector: 'app-institution',
  standalone: true,
  imports: [CommonModule, FormsModule, PageBannerComponent],
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.scss'
})
export class InstitutionComponent {
  private svc = inject(InstitutionService);

  private all = signal<Institution[]>([]);
  search = signal('');
  activeCategory = signal<InstitutionCategory | 'All'>('All');

  categories: (InstitutionCategory | 'All')[] = [
    'All', 'Cantonment Public', 'Cantonment Board', 'Cantonment English', 'BN College', 'BAF Shaheen'
  ];

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const cat = this.activeCategory();
    return this.all()
      .filter((i) => (cat === 'All' ? true : i.category === cat))
      .filter((i) =>
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.shortName.toLowerCase().includes(q) ||
        (i.eiin || '').includes(q)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  counts = computed(() => {
    const list = this.all();
    const map: Record<string, number> = { All: list.length };
    for (const c of this.categories) {
      if (c !== 'All') map[c] = list.filter((i) => i.category === c).length;
    }
    return map;
  });

  ngOnInit() {
    this.svc.getAll().subscribe((list) => this.all.set(list));
  }

  setCategory(c: InstitutionCategory | 'All') { this.activeCategory.set(c); }
}
