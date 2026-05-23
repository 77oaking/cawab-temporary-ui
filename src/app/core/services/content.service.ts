import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notice, NewsArticle, GalleryItem, MembershipTier, Merchandise, AdBanner } from '../models/content.model';

interface ContentBundle {
  notices: Notice[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  membershipTiers: MembershipTier[];
  merchandise: Merchandise[];
  ads: AdBanner[];
}

/**
 * ContentService serves placeholder Notices/News/Gallery/Membership data.
 * In Phase 2 each collection moves to its own API endpoint; split the
 * methods below to call `${apiUrl}/notices` etc.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private readonly source = environment.useMockData
    ? 'assets/data/content.json'
    : `${environment.apiUrl}/content`;

  private bundle(): Observable<ContentBundle> {
    return this.http.get<ContentBundle>(this.source);
  }

  getNotices(): Observable<Notice[]> {
    return this.bundle().pipe(map((b) => b.notices));
  }

  getNews(type?: NewsArticle['type']): Observable<NewsArticle[]> {
    return this.bundle().pipe(
      map((b) => (type ? b.news.filter((n) => n.type === type) : b.news))
    );
  }

  getGallery(): Observable<GalleryItem[]> {
    return this.bundle().pipe(map((b) => b.gallery));
  }

  getMembershipTiers(): Observable<MembershipTier[]> {
    return this.bundle().pipe(map((b) => b.membershipTiers));
  }

  getMerchandise(): Observable<Merchandise[]> {
    return this.bundle().pipe(map((b) => b.merchandise));
  }

  getAds(): Observable<AdBanner[]> {
    return this.bundle().pipe(map((b) => b.ads));
  }
}
