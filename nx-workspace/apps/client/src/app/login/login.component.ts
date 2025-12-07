import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GlobalActions } from '../store/global.actions';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, FormsModule, Button],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  email = '';
  password = '';

  private readonly store = inject(Store);

  submitLogIn() {
    this.store.dispatch(GlobalActions.submitLogIn({ email: this.email, password: this.password }));
  }
}
