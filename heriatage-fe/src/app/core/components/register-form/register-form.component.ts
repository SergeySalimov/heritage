import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginInterface } from '../login-form/login-form.component';
import { GenderEnum } from '../../interfaces/user';
import { MatSelectModule } from '@angular/material/select';

export interface UserRegisterInterface extends UserLoginInterface {
  name: string;
  surname: string;
  gender: GenderEnum | null;
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatSelectModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Input() registerInvalid = false;
  @Output()  userRegisterChange: EventEmitter<UserRegisterInterface> = new EventEmitter<UserRegisterInterface>();
  public registerUser: UserRegisterInterface = {
    name: '',
    surname: '',
    gender: null,
    email: '',
    password: '',
  }
  public GenderEnum: typeof GenderEnum = GenderEnum;
  public onSubmit(): void {
    this.userRegisterChange.emit(this.registerUser);
  }
}
