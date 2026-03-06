import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);

  // Signal que mantiene el estado global del tema
  readonly isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Este efecto se ejecuta automáticamente cada vez que isDarkMode cambie
    effect(() => {
      const dark = this.isDarkMode();
      const html = this.document.documentElement;

      if (dark) {
        html.classList.add('dark');
        localStorage.setItem('user-theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('user-theme', 'light');
      }
    });

    // Escuchar cambios del sistema operativo si no hay preferencia guardada
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.isDarkMode.set(e.matches);
    });
  }

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem('user-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
  }
}
