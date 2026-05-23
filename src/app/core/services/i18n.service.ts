import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';

export type Lang = 'en' | 'bn';

/** Translation dictionary. Add keys as the UI grows; missing keys fall back to the key itself. */
const DICT: Record<string, { en: string; bn: string }> = {
  'brand.tagline': { en: 'For Students, By Students. For a Better Tomorrow.', bn: 'শিক্ষার্থীদের জন্য, শিক্ষার্থীদের দ্বারা। একটি উন্নত আগামীর জন্য।' },
  'nav.home': { en: 'Home', bn: 'হোম' },
  'nav.about': { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
  'nav.notice': { en: 'Notice Board', bn: 'নোটিশ বোর্ড' },
  'nav.departments': { en: 'Departments', bn: 'বিভাগসমূহ' },
  'nav.membership': { en: 'Membership', bn: 'সদস্যপদ' },
  'nav.institution': { en: 'Institution', bn: 'প্রতিষ্ঠান' },
  'nav.gallery': { en: 'Gallery', bn: 'গ্যালারি' },
  'nav.news': { en: 'News Portal', bn: 'সংবাদ' },
  'nav.contact': { en: 'Contact Us', bn: 'যোগাযোগ' },
  'nav.join': { en: 'Join Us', bn: 'যোগ দিন' },

  'home.hero.title1': { en: 'Empowering Cantonmentians.', bn: 'ক্যান্টনমেন্টিয়ানদের ক্ষমতায়ন।' },
  'home.hero.title2': { en: 'Building a Better Tomorrow.', bn: 'একটি উন্নত আগামী গড়ছি।' },
  'home.hero.lead': { en: 'A unified platform for all former students of cantonment-based educational institutions across Bangladesh and abroad.', bn: 'বাংলাদেশ ও বিদেশের ক্যান্টনমেন্টভিত্তিক শিক্ষাপ্রতিষ্ঠানের সকল প্রাক্তন শিক্ষার্থীদের একটি ঐক্যবদ্ধ প্ল্যাটফর্ম।' },
  'home.cta.involved': { en: 'Get Involved', bn: 'যুক্ত হোন' },
  'home.cta.initiatives': { en: 'Our Initiatives', bn: 'আমাদের উদ্যোগ' },

  'common.readMore': { en: 'Read More', bn: 'আরও পড়ুন' },
  'common.viewAll': { en: 'View All', bn: 'সব দেখুন' },
  'common.learnMore': { en: 'Learn More', bn: 'বিস্তারিত' },
  'common.search': { en: 'Search', bn: 'অনুসন্ধান' },
  'common.applyNow': { en: 'Apply Now', bn: 'এখন আবেদন করুন' },

  'footer.rights': { en: 'All rights reserved.', bn: 'সর্বস্বত্ব সংরক্ষিত।' },
  'footer.quickLinks': { en: 'Quick Links', bn: 'দ্রুত লিঙ্ক' },
  'footer.contact': { en: 'Contact', bn: 'যোগাযোগ' }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>((environment.defaultLanguage as Lang) || 'en');

  /** Reactive flag handy for templates. */
  readonly isBangla = computed(() => this.lang() === 'bn');

  setLang(lang: Lang): void {
    this.lang.set(lang);
    document.documentElement.setAttribute('lang', lang);
  }

  toggle(): void {
    this.setLang(this.lang() === 'en' ? 'bn' : 'en');
  }

  /** Translate a key for the current language. */
  t(key: string): string {
    const entry = DICT[key];
    if (!entry) return key;
    return entry[this.lang()];
  }
}
