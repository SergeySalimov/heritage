import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  template: `
    <app-navigation>
      <router-outlet></router-outlet>
    </app-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageWrapperComponent {}
