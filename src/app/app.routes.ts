import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'todo-list', component: TodoListComponent, canActivate: [authGuard] }
];
