import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AsideComponent } from './aside/aside.component';
import { authGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'aside', component: AsideComponent, canActivate: [authGuard] },
  { path: 'header', component: HeaderComponent, canActivate: [authGuard] },
  { path: 'footer', component: FooterComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
