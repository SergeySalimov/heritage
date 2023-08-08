import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../table/table.component';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../ui-blocks';

@Component({
  selector: 'app-dashboard-main-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TableComponent,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './dashboard-main-card.component.html',
  styleUrls: ['./dashboard-main-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMainCardComponent {
  @Input() public title: string;

  public cols: number = 2;
  public rows: number = 1;
}
