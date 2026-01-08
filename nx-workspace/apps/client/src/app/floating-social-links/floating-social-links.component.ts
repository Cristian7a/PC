import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { SOCIAL_LINKS } from '../shared/constants/socials.constants';

@Component({
  selector: 'app-floating-social-links',
  imports: [Button, Tooltip],
  templateUrl: './floating-social-links.component.html',
  styleUrl: './floating-social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingSocialLinksComponent {
  socials = SOCIAL_LINKS;
}
