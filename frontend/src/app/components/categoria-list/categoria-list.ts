import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaListComponent implements OnInit {
  categorias: any[] = [];
  mensagem = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.api.getCategorias().subscribe((data) => (this.categorias = data));
  }

  deletar(id: number) {
    if (confirm('Deseja excluir esta categoria?')) {
      this.api.deletarCategoria(id).subscribe({
        next: () => this.carregar(),
        error: (err) => (this.mensagem = err.error),
      });
    }
  }
}
