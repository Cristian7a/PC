import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { ToastModule } from 'primeng/toast';

@Component({
  imports: [RouterModule, ToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'client';
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private themeService = inject(ThemeService);

  constructor() {
    this.translateService.addLangs(['en', 'es']);
    this.translateService.setFallbackLang('es');
  }
  ngOnInit(): void {
    console.log('AppComponent initialized');
  }
}
