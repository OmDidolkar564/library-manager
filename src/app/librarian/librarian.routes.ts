import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component'; 

export const LIBRARIAN_ROUTES: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }

];