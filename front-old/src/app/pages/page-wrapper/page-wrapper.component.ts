import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  template: `
    <app-navigation>
      <div class="page-wrapper">
        <router-outlet></router-outlet>
      </div>
    </app-navigation>
  `,
  styles: [`
    .page-wrapper {
      min-height: calc(100vh - 64px);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageWrapperComponent {}
