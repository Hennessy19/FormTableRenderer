import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormComponent } from './form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "login", component: LoginPageComponent},
  {path: "form",component:FormComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"task",component:TaskComponent},
  {path:'login',component:LoginPageComponent},
  {path:'sign_up',component:SignupComponent},
  {path:"",redirectTo:"dashboard",pathMatch:'full'}
  //{path: "table", component:TableComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
