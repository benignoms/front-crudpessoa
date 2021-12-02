import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas/pessoas.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [
    PessoasComponent
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    AppMaterialModule,
    SharedModule,
    FormsModule
  ]
})
export class PessoasModule { }
