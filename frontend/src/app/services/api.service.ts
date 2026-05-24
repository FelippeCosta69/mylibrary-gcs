import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/categorias`); }
  criarCategoria(c: any): Observable<any> { return this.http.post(`${this.baseUrl}/categorias`, c); }
  deletarCategoria(id: number): Observable<any> { return this.http.delete(`${this.baseUrl}/categorias/${id}`); }

  getLivros(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/livros`); }
  criarLivro(l: any): Observable<any> { return this.http.post(`${this.baseUrl}/livros`, l); }
  deletarLivro(id: number): Observable<any> { return this.http.delete(`${this.baseUrl}/livros/${id}`); }
  buscarLivros(termo: string): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/livros/buscar?termo=${termo}`); }
  getLivrosPorStatus(status: string): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/livros/por-status/${status}`); }

  getEmprestimos(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/emprestimos`); }
  getEmprestimosAtivos(): Observable<any[]> { return this.http.get<any[]>(`${this.baseUrl}/emprestimos/ativos`); }
  emprestar(e: any): Observable<any> { return this.http.post(`${this.baseUrl}/emprestimos/emprestar`, e); }
  devolver(id: number): Observable<any> { return this.http.post(`${this.baseUrl}/emprestimos/${id}/devolver`, {}); }
}
