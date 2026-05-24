import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  totalLivros = 0; totalDisponiveis = 0; totalEmprestados = 0; totalEmprestimosAtivos = 0;
  ultimosEmprestimos: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getLivros().subscribe(data => {
      this.totalLivros = data.length;
      this.totalDisponiveis = data.filter((l:any) => l.status === "DISPONIVEL").length;
      this.totalEmprestados = data.filter((l:any) => l.status === "EMPRESTADO").length;
    });
    this.api.getEmprestimosAtivos().subscribe(data => {
      this.totalEmprestimosAtivos = data.length;
      this.ultimosEmprestimos = data.slice(0, 5);
    });
  }
}
