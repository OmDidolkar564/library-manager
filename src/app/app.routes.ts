import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.routes')
        .then(m => m.BOOKS_ROUTES)
  },

  {
    path: 'librarian',
    loadChildren: () =>
      import('./librarian/librarian.routes')
        .then(m => m.LIBRARIAN_ROUTES)
  },

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  }
];