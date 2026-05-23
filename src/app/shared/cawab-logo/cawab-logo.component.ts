import { Component, Input } from '@angular/core';

/**
 * Inline SVG rendition of the CAWAB shield (green/red split with candle,
 * pen & sword, framed by a gold laurel). Scalable and theme-independent.
 * Replace with the official PNG/SVG asset when available — just swap the
 * template for an <img src="assets/img/cawab-logo.png">.
 */
@Component({
  selector: 'app-cawab-logo',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CAWAB logo">
      <!-- Laurel (simplified) -->
      <g fill="none" stroke="#f5b614" stroke-width="6" stroke-linecap="round" opacity="0.95">
        <path d="M40 60 Q18 100 42 150"/>
        <path d="M160 60 Q182 100 158 150"/>
      </g>
      <g fill="#f5b614" opacity="0.95">
        <path d="M38 78 q-12 6 -16 18 q12 0 18 -10 z"/>
        <path d="M36 104 q-13 4 -18 16 q13 1 20 -9 z"/>
        <path d="M40 130 q-12 6 -15 18 q12 -1 18 -11 z"/>
        <path d="M162 78 q12 6 16 18 q-12 0 -18 -10 z"/>
        <path d="M164 104 q13 4 18 16 q-13 1 -20 -9 z"/>
        <path d="M160 130 q12 6 15 18 q-12 -1 -18 -11 z"/>
      </g>
      <!-- Shield -->
      <path d="M100 38 L150 54 V108 Q150 150 100 168 Q50 150 50 108 V54 Z" fill="#0d5132"/>
      <path d="M100 38 L150 54 V108 Q150 150 100 168 V38 Z" fill="#c8232c"/>
      <path d="M100 38 L150 54 V108 Q150 150 100 168 Q50 150 50 108 V54 Z" fill="none" stroke="#ffffff" stroke-width="2.5"/>
      <!-- Pen & sword cross + candle -->
      <g stroke="#f5b614" stroke-width="5" stroke-linecap="round">
        <line x1="78" y1="135" x2="120" y2="80"/>
        <line x1="122" y1="135" x2="80" y2="80"/>
      </g>
      <rect x="95" y="70" width="10" height="26" rx="2" fill="#f5b614"/>
      <path d="M100 62 q5 5 0 9 q-5 -4 0 -9 z" fill="#f5b614"/>
    </svg>
  `,
  styles: [`:host { display: inline-flex; line-height: 0; }`]
})
export class CawabLogoComponent {
  @Input() size = 56;
}
