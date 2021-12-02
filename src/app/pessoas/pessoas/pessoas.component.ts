import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { MessageDialogComponent } from '../../shared/components/error-dialog/message-dialog.component';
import { Pessoa } from '../model/pessoa';
import { PessoasService } from '../services/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css'],
})
export class PessoasComponent implements OnInit {
  pessoas$: Observable<Pessoa[]>;
  buscaNome: string = '';
  erros: string[] = [];
  pessoa: Pessoa = {
    nome: '',
    cpf: '',
    dataNascimento: new Date(),
    sexo: 'M',
    peso: 0,
    altura: 0,
  };

  displayedColumns = ['nome', 'cpf', 'altura', 'peso', 'sexo'];

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private pessoasService: PessoasService,
    public dialog: MatDialog
  ) {
    this.pessoas$ = this.pessoasService.findAll();
  }

  createPessoa(): void {
    console.log(this.pessoa);
    this.pessoasService
      .create(this.pessoa)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          let mensagem: string = '';
          for (let erro of e.error) {
            mensagem += erro.erro + '<br/>';
          }
          this.showMessage(mensagem, 'Erro');
          return of();
        })
      )
      .subscribe((resposta) => {
        this.pessoas$ = of(resposta);
        this.openSnackBar('Pessoa cadastrada!');
      });
  }

  editPessoa(pessoa: Pessoa): void {
    this.pessoasService.update(pessoa).subscribe((resposta) => {
      this.pessoas$ = of(resposta);
      this.openSnackBar('Pessoa alterada!');
    });
  }

  removePessoa(pessoa: Pessoa): void {
    this.pessoasService.remove(pessoa).subscribe((resposta) => {
      this.pessoas$ = of(resposta);
      this.openSnackBar('Pessoa excluída!');
    });
  }

  newPessoa() {
    this.pessoa = {
      nome: '',
      cpf: '',
      dataNascimento: new Date(),
      sexo: 'M',
      peso: 0,
      altura: 0,
    };
  }

  findById(id: number): void {
    this.pessoasService.findById(id).subscribe((p) => (this.pessoa = p));
    console.log(this.pessoa.cpf);
  }

  findByNome(nome?: string): void {
    console.log(nome);
    this.pessoas$ = this.pessoasService.findByNome(nome).pipe(
      catchError((error) => {
        console.log(error);
        this.showMessage(
          'Ocorreu uma falha ao carregar os dados da API',
          'Erro'
        );
        return of([]);
      })
    );
  }
  calcularPesoIdeal(pessoa: Pessoa) {
    this.pessoasService
      .calculateWeight(pessoa)
      .subscribe((resposta) =>{
        console.log(resposta);
        this.showMessage(
          `O peso ideal de ${pessoa.nome}, é: ${resposta.pesoIdeal}`,
          'Peso Ideal'
        )
      }
      );
  }

  //
  showMessage(msg: string, titulo: string) {
    this.dialog.open(MessageDialogComponent, {
      data: { mensagem: msg, titulo: titulo },
    });
  }

  onSubmit(formPessoa: NgForm) {
    this.newPessoa();
    formPessoa.resetForm();
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'x', {
      duration: 5 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {}
}
