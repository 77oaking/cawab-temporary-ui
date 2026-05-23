import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { DepartmentService } from '../../core/services/department.service';
import { Department } from '../../core/models/department.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterLink, PageBannerComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
  private svc = inject(DepartmentService);
  departments: Department[] = [];

  ngOnInit() {
    this.svc.getAll().subscribe((d) => (this.departments = d));
  }
}
