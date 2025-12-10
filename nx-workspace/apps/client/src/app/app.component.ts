import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'client';
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.translateService.addLangs(['en', 'es']);
    this.translateService.setFallbackLang('es');
  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkClass(prefersDark.matches);

    prefersDark.addEventListener('change', (event) => {
      this.toggleDarkClass(event.matches);
    });
  }

  private toggleDarkClass(isDark: boolean) {
    const html = this.document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
