import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CategoriaListComponent } from './components/categoria-list/categoria-list';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form';
import { LivroListComponent } from './components/livro-list/livro-list';
import { LivroFormComponent } from './components/livro-form/livro-form';
import { EmprestimoListComponent } from './components/emprestimo-list/emprestimo-list';
import { EmprestimoFormComponent } from './components/emprestimo-form/emprestimo-form';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categorias', component: CategoriaListComponent },
  { path: 'categorias/nova', component: CategoriaFormComponent },
  { path: 'livros', component: LivroListComponent },
  { path: 'livros/novo', component: LivroFormComponent },
  { path: 'emprestimos', component: EmprestimoListComponent },
  { path: 'emprestimos/novo', component: EmprestimoFormComponent },
];
