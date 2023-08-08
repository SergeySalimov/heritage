import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard-info-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './dashboard-info-card.component.html',
  styleUrls: ['./dashboard-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardInfoCardComponent {
  @Input() public show: boolean = true;
  @Input() public title: string;

  public cols: number = 1;
  public rows: number = 1;
}
