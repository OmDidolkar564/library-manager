import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth-guard';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

export const BOOKS_ROUTES: Routes = [

  {
    path: '',
    component: BookListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'detail/:id',
    component: BookDetailComponent,
    canActivate: [AuthGuard]
  }

];