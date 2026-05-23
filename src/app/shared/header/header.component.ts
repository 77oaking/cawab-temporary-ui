import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { CawabLogoComponent } from '../cawab-logo/cawab-logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CawabLogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  i18n = inject(I18nService);
  menuOpen = signal(false);
  scrolled = signal(false);

  nav = [
    { key: 'nav.home', path: '/', exact: true },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.notice', path: '/notice' },
    { key: 'nav.departments', path: '/departments' },
    { key: 'nav.membership', path: '/membership' },
    { key: 'nav.institution', path: '/institution' },
    { key: 'nav.gallery', path: '/gallery' },
    { key: 'nav.news', path: '/news' },
    { key: 'nav.contact', path: '/contact' }
  ];

  /** Switch the header from transparent to solid once the user scrolls past the top. */
  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMenu() { this.menuOpen.update((v) => !v); }
  closeMenu() { this.menuOpen.set(false); }
}
