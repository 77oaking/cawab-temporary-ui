import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { DepartmentService } from '../../core/services/department.service';
import { Department } from '../../core/models/department.model';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.scss'
})
export class DepartmentDetailComponent {
  private route = inject(ActivatedRoute);
  private svc = inject(DepartmentService);
  dept?: Department;
  notFound = false;

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((p) => this.svc.getById(p.get('id') || '')))
      .subscribe((d) => {
        this.dept = d;
        this.notFound = !d;
      });
  }
}
