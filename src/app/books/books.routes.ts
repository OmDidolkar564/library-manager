import { Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

export const BOOKS_ROUTES: Routes = [

  {
    path: '',
    component: BookListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'detail/:id',
    component: BookDetailComponent,
    canActivate: [authGuard]
  }

];