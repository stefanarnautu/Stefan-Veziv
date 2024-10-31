import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './auth/auth.service';
import { UnknownurlComponent } from './components/unknownurl/unknownurl.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard] // Use your AuthGuard here if necessary
  },
  { path: '**', component: UnknownurlComponent } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Only use forRoot() here
  exports: [RouterModule]
})
export class AppRoutingModule {}