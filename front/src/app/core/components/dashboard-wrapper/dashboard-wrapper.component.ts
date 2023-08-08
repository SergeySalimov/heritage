import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs/operators';
import { DashboardMainCardComponent } from '../dashboard-main-card/dashboard-main-card.component';
import { DashboardInfoCardComponent } from '../dashboard-info-card/dashboard-info-card.component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { DashboardMainCardDirective } from '../dashboard-main-card/dashboard-main-card.directive';

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [
    MatGridListModule,
    NgForOf,
    AsyncPipe,
    DashboardMainCardComponent,
    DashboardInfoCardComponent,
    LetModule,
    NgIf,
    DashboardMainCardDirective
  ],
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss']
})
export class DashboardWrapperComponent {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  private _isInfo1Active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _isInfo2Active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  isInfo1$: Observable<boolean> = this._isInfo1Active.asObservable();
  isInfo2$: Observable<boolean> = this._isInfo2Active.asObservable();
  isInfo$: Observable<boolean> = combineLatest([this._isInfo1Active, this._isInfo2Active]).pipe(
    map(([info1, info2]: [boolean, boolean]) => info1 || info2),
  );
  isWeb$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web).pipe(
    map(({ matches }: BreakpointState) => matches),
  );
}
