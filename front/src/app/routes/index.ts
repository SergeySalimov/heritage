import { Component, inject, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '../state/user.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    RouterOutlet,
  ],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export default class HomePageComponent implements OnInit{
  store = inject(Store);
  ngOnInit(): void {
    this.store.dispatch(UserActions.enter());
  }
}
