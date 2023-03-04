import { Component, inject } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { MatButtonModule } from '@angular/material/button';

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
export class TreeComponent {
  userService = inject(UserService);

  users: any;

  onTestClick(): void {
    this.userService.getAllUsers().subscribe((data => {
      this.users = data;
    }));
  }
}
