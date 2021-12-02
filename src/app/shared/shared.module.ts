import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { MessageDialogComponent } from './components/error-dialog/message-dialog.component';

@NgModule({
  declarations: [MessageDialogComponent],
  imports: [AppMaterialModule, CommonModule],
  exports: [MessageDialogComponent],
})
export class SharedModule {}
