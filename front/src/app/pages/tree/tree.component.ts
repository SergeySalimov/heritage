import { Component, inject, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as treeActions from '../../state/tree/tree.actions';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    JsonPipe,
  ],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  store: Store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(treeActions.enter());
  }
}
