import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { CawabLogoComponent } from '../cawab-logo/cawab-logo.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, CawabLogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  i18n = inject(I18nService);
  year = new Date().getFullYear();
  contact = environment.contact;

  links = [
    { key: 'nav.about', path: '/about' },
    { key: 'nav.departments', path: '/departments' },
    { key: 'nav.membership', path: '/membership' },
    { key: 'nav.institution', path: '/institution' },
    { key: 'nav.news', path: '/news' },
    { key: 'nav.contact', path: '/contact' }
  ];

  socials = [
    { name: 'WhatsApp', short: 'WA' },
    { name: 'Facebook', short: 'fb' },
    { name: 'Instagram', short: 'IG' },
    { name: 'X', short: 'X' },
    { name: 'LinkedIn', short: 'in' },
    { name: 'YouTube', short: 'YT' }
  ];
}
