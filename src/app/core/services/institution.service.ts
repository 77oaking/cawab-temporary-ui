import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Institution, InstitutionCategory, ForceBranch } from '../models/institution.model';

/**
 * InstitutionService
 *
 * PHASE 1: reads from /assets/data/institutions.json (mock).
 * PHASE 2: when environment.useMockData === false, the same methods hit
 *          `${environment.apiUrl}/institutions`. Components never change.
 */
@Injectable({ providedIn: 'root' })
export class InstitutionService {
  private http = inject(HttpClient);
  private readonly mockUrl = 'assets/data/institutions.json';
  private readonly apiUrl = `${environment.apiUrl}/institutions`;

  private get source(): string {
    return environment.useMockData ? this.mockUrl : this.apiUrl;
  }

  getAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.source);
  }

  getById(id: string): Observable<Institution | undefined> {
    return this.getAll().pipe(map((list) => list.find((i) => i.id === id)));
  }

  getByCategory(category: InstitutionCategory): Observable<Institution[]> {
    return this.getAll().pipe(map((list) => list.filter((i) => i.category === category)));
  }

  getByForce(force: ForceBranch): Observable<Institution[]> {
    return this.getAll().pipe(map((list) => list.filter((i) => i.force === force)));
  }
}
