import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Leader, CouncilType } from '../models/leadership.model';

@Injectable({ providedIn: 'root' })
export class LeadershipService {
  private http = inject(HttpClient);
  private readonly source = environment.useMockData
    ? 'assets/data/leadership.json'
    : `${environment.apiUrl}/leadership`;

  getAll(): Observable<Leader[]> {
    return this.http.get<Leader[]>(this.source);
  }

  getByCouncil(council: CouncilType): Observable<Leader[]> {
    return this.getAll().pipe(
      map((list) => list.filter((l) => l.council === council).sort((a, b) => a.order - b.order))
    );
  }
}
