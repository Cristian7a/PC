import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-router-error-wrapper',
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './router-error-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterErrorWrapperComponent {
  activatedRoute = inject(ActivatedRoute);
  errorCode$ = this.activatedRoute.params;
}
