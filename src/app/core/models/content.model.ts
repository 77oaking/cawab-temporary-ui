/** Notice, News, Event, Gallery, Membership models (placeholder data for Phase 1). */

export interface Notice {
  id: string;
  title: string;
  date: string;          // ISO date
  category: 'General' | 'Event' | 'Academic' | 'Urgent';
  pinned?: boolean;
  body: string;
  attachmentUrl?: string;
}

export interface NewsArticle {
  id: string;
  type: 'News' | 'Event' | 'Show';
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  album: string;
  caption: string;
  image: string;         // placeholder gradient/color used in Phase 1
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  benefits: string[];
  featured?: boolean;
}
