import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-emprestimo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emprestimo-list.html',
  styleUrl: './emprestimo-list.css',
})
export class EmprestimoListComponent implements OnInit {
  emprestimos: any[] = [];
  mensagem = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.api.getEmprestimos().subscribe((data) => (this.emprestimos = data));
  }

  devolver(id: number) {
    if (confirm('Confirmar devolução?')) {
      this.api.devolver(id).subscribe({
        next: () => this.carregar(),
        error: (err) => (this.mensagem = err.error),
      });
    }
  }
}
