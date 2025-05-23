import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'employees/add', pathMatch: 'full' },
    { path: 'employees', component: EmployeeListComponent },
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    { path: 'employees/edit/:id', component: EmployeeFormComponent },
    { path: 'employees/add', component: EmployeeFormComponent }

  ];
  
