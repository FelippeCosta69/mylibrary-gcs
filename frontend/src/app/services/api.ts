import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Categorias
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categorias`);
  }

  criarCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categorias`, categoria);
  }

  deletarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categorias/${id}`);
  }

  // Livros
  getLivros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/livros`);
  }

  getLivroPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/livros/${id}`);
  }

  criarLivro(livro: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/livros`, livro);
  }

  deletarLivro(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/livros/${id}`);
  }

  buscarLivros(termo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/livros/buscar?termo=${termo}`);
  }

  getLivrosPorCategoria(categoriaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/livros/por-categoria/${categoriaId}`);
  }

  getLivrosPorStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/livros/por-status/${status}`);
  }

  // Emprestimos
  getEmprestimos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/emprestimos`);
  }

  getEmprestimosAtivos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/emprestimos/ativos`);
  }

  getEmprestimosAtrasados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/emprestimos/atrasados`);
  }

  emprestar(emprestimo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/emprestimos/emprestar`, emprestimo);
  }

  devolver(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/emprestimos/${id}/devolver`, {});
  }
}
