import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { BranchComponent } from './branch/branch.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employe', component: EmployeesComponent },
  { path: 'branch', component: BranchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
