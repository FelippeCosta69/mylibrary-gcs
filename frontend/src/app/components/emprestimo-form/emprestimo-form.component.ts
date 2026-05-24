import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-emprestimo-form",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./emprestimo-form.component.html"
})
export class EmprestimoFormComponent implements OnInit {
  emprestimo: any = { livro: { id: null }, nomePessoa: "", telefone: "", dataDevolucaoPrevista: "" };
  livrosDisponiveis: any[] = []; mensagem = "";
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() { this.api.getLivrosPorStatus("DISPONIVEL").subscribe(data => this.livrosDisponiveis = data); }
  salvar() { this.api.emprestar(this.emprestimo).subscribe({ next: () => this.router.navigate(["/emprestimos"]), error: (err) => this.mensagem = err.error }); }
}
