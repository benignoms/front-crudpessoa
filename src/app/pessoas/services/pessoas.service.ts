import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Peso } from '../model/peso';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private readonly API_URL = 'http://localhost:8181/pessoas';

  constructor(private httpClient: HttpClient) {}

  create(pessoa: Pessoa): Observable<Pessoa[]> {
    return this.httpClient.post<Pessoa[]>(this.API_URL, pessoa);
  }

  update(pessoa: Pessoa): Observable<Pessoa[]> {
    const URL = `${this.API_URL}/${pessoa.id}`;
    return this.httpClient.put<Pessoa[]>(URL, pessoa);
  }

  remove(pessoa: Pessoa): Observable<Pessoa[]> {
    const URL = `${this.API_URL}/${pessoa.id}`;
    return this.httpClient.delete<Pessoa[]>(URL);
  }

  calculateWeight(pessoa: Pessoa): Observable<Peso> {
    const URL = `${this.API_URL}/pesoIdeal/${pessoa.id}`;
    return this.httpClient.get<Peso>(URL);
  }

  findAll(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(this.API_URL);
  }

  findByNome(nome?: string): Observable<Pessoa[]> {
    const URL = `${this.API_URL}/buscar?nome=${nome}`;
    return this.httpClient.get<Pessoa[]>(URL);
  }

  findById(id: number): Observable<Pessoa> {
    const URL = `${this.API_URL}/${id}`;
    return this.httpClient.get<Pessoa>(URL);
  }
}
