import { ANGULAR_TEMPLATE_API } from '../app.config';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageUrlService {
  private readonly apiUrl = inject(ANGULAR_TEMPLATE_API);

  /** Gets the full image source URL, handling relative paths and defaults. */
  getImageUrl(url: string | null | undefined, defaultPath: string): string {
    // Check if the URL is empty or null
    if (!url || url.trim() === '') {
      return defaultPath;
    }
    // Check if the URL is absolute (starts with http)
    if (url.startsWith('http')) {
      return url;
    }
    // Assume relative path and prepend API URL
    return url;
  }
}
