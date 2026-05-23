import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageBannerComponent } from '../../shared/page-banner/page-banner.component';
import { ContentService } from '../../core/services/content.service';
import { MembershipTier } from '../../core/models/content.model';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageBannerComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss'
})
export class MembershipComponent {
  private content = inject(ContentService);
  private fb = inject(FormBuilder);

  tiers: MembershipTier[] = [];
  submitted = false;

  /** Reactive form ready for Phase-2 backend submission. */
  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    institution: ['', Validators.required],
    batch: [''],
    tier: ['life', Validators.required]
  });

  ngOnInit() {
    this.content.getMembershipTiers().subscribe((t) => (this.tiers = t));
  }

  selectTier(id: string) { this.form.patchValue({ tier: id }); }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // PHASE 2: POST this.form.value to `${apiUrl}/membership/apply`
    this.submitted = true;
  }
}
