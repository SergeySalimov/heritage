import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type loaderSizeType = 'small' | 'medium' | 'big';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  template: `
    <mat-spinner [diameter]="sizeMap[size] || 20"></mat-spinner>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() size: loaderSizeType;
  sizeMap: Record<loaderSizeType, number> = {
    small: 20,
    medium: 120,
    big: 220,
  }
}
