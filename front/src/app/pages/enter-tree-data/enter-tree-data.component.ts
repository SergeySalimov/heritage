import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardWrapperComponent } from '../../core/components';

@Component({
  selector: 'app-enter-tree-data',
  standalone: true,
  imports: [DashboardWrapperComponent],
  templateUrl: './enter-tree-data.component.html',
  styleUrls: ['./enter-tree-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterTreeDataComponent {

}
