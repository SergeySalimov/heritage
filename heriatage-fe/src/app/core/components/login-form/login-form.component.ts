import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

export interface UserLoginInterface {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input() loginInvalid = false;
  @Input() loading: boolean | undefined;
  @Output() userLoginChange: EventEmitter<UserLoginInterface> = new EventEmitter<UserLoginInterface>();
  public loginUser: UserLoginInterface = {
    email: '',
    password: '',
  }
  public onSubmit(): void {
    this.userLoginChange.emit(this.loginUser);
  }
}
