import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieListComponent} from './movie-list/movie-list.component';
import { SearchListComponent } from './search-list/search-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'search',component:SearchListComponent},
  { path:'login', component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'all-movies',component:MovieListComponent},
  {path: 'user-profile',component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
