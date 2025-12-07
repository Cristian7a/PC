import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'client';
  private readonly translateService = inject(TranslateService);

  constructor() {
    this.translateService.addLangs(['en', 'es']);
    this.translateService.setFallbackLang('es');
  }
}
