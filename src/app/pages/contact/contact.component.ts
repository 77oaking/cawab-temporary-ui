import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageBannerComponent],
  template: `
    <app-page-banner eyebrow="Get In Touch" title="Contact Us"
      subtitle="We'd love to hear from you. Reach out or join the CAWAB community today."></app-page-banner>

    <section class="section">
      <div class="container contact">
        <div class="contact__info">
          <h2>Reach CAWAB</h2>
          <a class="info" [href]="'mailto:' + contact.email">
            <span class="info__ic">✉</span>
            <span><b>Email</b>{{ contact.email }}</span>
          </a>
          <a class="info" [href]="'tel:' + contact.phone">
            <span class="info__ic">☎</span>
            <span><b>Phone</b>{{ contact.phone }}</span>
          </a>
          <div class="info">
            <span class="info__ic">⚲</span>
            <span><b>Address</b>Dhaka, Bangladesh</span>
          </div>
          <div class="map">Map embed placeholder (Phase 2)</div>
        </div>

        <form class="contact__form card" [formGroup]="form" (ngSubmit)="submit()" *ngIf="!sent">
          <h2>Send a Message</h2>
          <div class="field"><label>Name *</label><input formControlName="name" type="text"></div>
          <div class="field"><label>Email *</label><input formControlName="email" type="email"></div>
          <div class="field"><label>Subject</label><input formControlName="subject" type="text"></div>
          <div class="field"><label>Message *</label><textarea formControlName="message" rows="5"></textarea></div>
          <button class="btn btn--gold" type="submit">Send Message</button>
        </form>

        <div class="contact__form card done" *ngIf="sent">
          <div class="check">✓</div>
          <h2>Message Sent</h2>
          <p>Thanks for reaching out! This is a demo form — in the live version your message will be delivered to the CAWAB team.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact { display: grid; grid-template-columns: 1fr 1.3fr; gap: 36px; align-items: start; }
    .contact__info h2, .contact__form h2 { color: var(--cawab-green); margin-bottom: 20px; }
    .info { display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--line); }
    .info__ic { width: 44px; height: 44px; border-radius: 50%; background: var(--surface); display: grid; place-items: center; font-size: 20px; color: var(--cawab-green); flex: 0 0 44px; }
    .info b { display: block; font-size: 13px; color: var(--muted); font-weight: 600; }
    .map { margin-top: 20px; height: 180px; border-radius: var(--radius); background: var(--surface); display: grid; place-items: center; color: var(--muted); font-size: 14px; border: 1px dashed var(--line); }
    .contact__form { padding: 30px; }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
    .field input, .field textarea { width: 100%; padding: 11px 14px; border: 1.5px solid var(--line); border-radius: 8px; font-size: 15px; font-family: inherit; }
    .field input:focus, .field textarea:focus { outline: none; border-color: var(--cawab-green); }
    .contact__form .btn { width: 100%; justify-content: center; }
    .done { text-align: center; }
    .check { width: 64px; height: 64px; border-radius: 50%; background: var(--cawab-green); color: #fff; font-size: 32px; display: grid; place-items: center; margin: 0 auto 16px; }
    @media (max-width: 860px) { .contact { grid-template-columns: 1fr; } }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  contact = environment.contact;
  sent = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    // PHASE 2: POST to `${apiUrl}/contact`
    this.sent = true;
  }
}
