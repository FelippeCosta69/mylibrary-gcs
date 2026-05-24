import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-categoria-form",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./categoria-form.component.html"
})
export class CategoriaFormComponent {
  categoria = { nome: "", descricao: "" };
  mensagem = "";
  constructor(private api: ApiService, private router: Router) {}
  salvar() { this.api.criarCategoria(this.categoria).subscribe({ next: () => this.router.navigate(["/categorias"]), error: (err) => this.mensagem = err.error }); }
}
