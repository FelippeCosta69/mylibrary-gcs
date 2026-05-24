import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-livro-list",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: "./livro-list.component.html"
})
export class LivroListComponent implements OnInit {
  livros: any[] = []; mensagem = ""; termoBusca = ""; statusFiltro = "";
  constructor(private api: ApiService) {}
  ngOnInit() { this.carregar(); }
  carregar() { this.api.getLivros().subscribe(data => this.livros = data); }
  buscar() { if (this.termoBusca.trim()) { this.api.buscarLivros(this.termoBusca).subscribe(data => this.livros = data); } else { this.carregar(); } }
  filtrarStatus() { if (this.statusFiltro) { this.api.getLivrosPorStatus(this.statusFiltro).subscribe(data => this.livros = data); } else { this.carregar(); } }
  deletar(id: number) { if (confirm("Deseja excluir este livro?")) { this.api.deletarLivro(id).subscribe({ next: () => this.carregar(), error: (err) => this.mensagem = err.error }); } }
}
