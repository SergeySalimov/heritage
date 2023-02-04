import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, take } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { isUserLogged } from '../state/user.reducer';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../core/components/ui-blocks/modal/modal.component';
import { YesOrNo } from '../core/interfaces/common';
import { UserActions } from '../state/user.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    LetModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  private dialog = inject(MatDialog);
  private store = inject(Store);
  breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result: BreakpointState) => result.matches),
    shareReplay()
  );
  isUserLogged$: Observable<boolean> = this.store.select(isUserLogged);

  logOut(): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(ModalComponent, {
      width: '300px',
      disableClose: true,
      autoFocus: true,
      data: { text: 'Вы уверены, что хотите выйти?' },
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe((data: YesOrNo) => {
      if (data === YesOrNo.YES) {
        this.store.dispatch(UserActions.logout());
      }
    });
  }
}
