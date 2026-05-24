import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-livro-form",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./livro-form.component.html"
})
export class LivroFormComponent implements OnInit {
  livro: any = { titulo: "", autor: "", isbn: "", ano: null, categoria: { id: null } };
  categorias: any[] = []; mensagem = "";
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() { this.api.getCategorias().subscribe(data => this.categorias = data); }
  salvar() { this.api.criarLivro(this.livro).subscribe({ next: () => this.router.navigate(["/livros"]), error: (err) => this.mensagem = err.error }); }
}
