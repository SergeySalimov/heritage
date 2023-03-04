import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AlertEnum, IAlert } from '../../../../state/alert.reducer';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    MatButtonModule,
  ],
  template: `
    <ng-template #snackBarTemplate>
      <div class="snackbar-container mb-2">
        <mat-icon aria-hidden="false" aria-label="Example home icon">
          notifications
        </mat-icon>
        <span><strong>Уведомление</strong></span>
        <div class="app-spacer"></div>
        <button mat-icon-button (click)="onClose()"><mat-icon>close</mat-icon></button>
      </div>
      <p *ngIf="alert">
        {{ alert.text }}
      </p>
    </ng-template>
  `,
  styleUrls: ['snackbar.component.scss'],
  providers: [MatSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent implements OnChanges {
  snackBar = inject(MatSnackBar);

  @ViewChild('snackBarTemplate', { read: TemplateRef, static: true }) snackbarTemplate: TemplateRef<any>;
  @Input() alert: IAlert | null;
  @Output() alertClose: EventEmitter<void> = new EventEmitter<void>();
  snackbarRef: MatSnackBarRef<EmbeddedViewRef<any>>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('alert' in changes) {
      const alert: IAlert = changes['alert'].currentValue;

      if (alert) {
        this.snackbarRef = this.snackBar.openFromTemplate(
          this.snackbarTemplate,
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: [alert.type === AlertEnum.INFO ? 'blue-snackbar' : 'error-snackbar']
          },
        );
      }
    }
  }

  onClose(): void {
    this.alertClose.emit();
    this.snackbarRef?.dismiss();
  }
}
