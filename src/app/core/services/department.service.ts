import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Department } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private http = inject(HttpClient);
  private readonly source = environment.useMockData
    ? 'assets/data/departments.json'
    : `${environment.apiUrl}/departments`;

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.source);
  }

  getById(id: string): Observable<Department | undefined> {
    return this.getAll().pipe(map((list) => list.find((d) => d.id === id)));
  }
}
