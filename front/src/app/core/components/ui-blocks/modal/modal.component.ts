import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { YesOrNo } from '../../../interfaces/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, FormsModule],
  template: `
    <h2 mat-dialog-title class="text-center h1">Предупреждение</h2>
    <div mat-dialog-content>{{ data.text }}</div>
    <div mat-dialog-actions [align]="'end'" class="w-100 mt-1 mb-3">
      <button mat-button (click)="dialogRef.close(result.NO)" class="ml-3">Нет, спасибо</button>
      <div class="app-spacer"></div>
      <button mat-button cdkFocusInitial (click)="dialogRef.close(result.YES)" class="mr-3">Да</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  dialogRef = inject(MatDialogRef<ModalComponent>);
  data: { text: string } = inject(MAT_DIALOG_DATA, { optional: true });

  result: typeof YesOrNo = YesOrNo;
}
