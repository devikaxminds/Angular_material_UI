import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { UserTableComponent } from './user-table/user-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'users', component: UserTableComponent }
];
