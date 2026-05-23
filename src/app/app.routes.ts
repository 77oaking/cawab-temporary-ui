import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

/**
 * All pages are lazy-loaded standalone components. The admin route is guarded
 * by `authGuard` (a Phase-1 stub) and falls through to the placeholder page.
 */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent), title: 'CAWAB — Home' },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent), title: 'About Us — CAWAB' },
  { path: 'notice', loadComponent: () => import('./pages/notice-board/notice-board.component').then((m) => m.NoticeBoardComponent), title: 'Notice Board — CAWAB' },
  { path: 'departments', loadComponent: () => import('./pages/departments/departments.component').then((m) => m.DepartmentsComponent), title: 'Departments — CAWAB' },
  { path: 'departments/:id', loadComponent: () => import('./pages/department-detail/department-detail.component').then((m) => m.DepartmentDetailComponent), title: 'Department — CAWAB' },
  { path: 'membership', loadComponent: () => import('./pages/membership/membership.component').then((m) => m.MembershipComponent), title: 'Membership — CAWAB' },
  { path: 'institution', loadComponent: () => import('./pages/institution/institution.component').then((m) => m.InstitutionComponent), title: 'Institutions — CAWAB' },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent), title: 'Gallery — CAWAB' },
  { path: 'news', loadComponent: () => import('./pages/news/news.component').then((m) => m.NewsComponent), title: 'News Portal — CAWAB' },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent), title: 'Contact Us — CAWAB' },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent), title: 'Admin — CAWAB' },
  // Example of a future protected route guarded by authGuard:
  { path: 'admin/dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent) },
  { path: '**', redirectTo: '' }
];
