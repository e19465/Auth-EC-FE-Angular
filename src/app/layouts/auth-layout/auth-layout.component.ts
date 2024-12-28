import { Component, Input } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  templateUrl: './auth-layout.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('1s ease-in-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AuthLayoutComponent {
  @Input() imageSrc: string = ''; // Input for image source
  @Input() title: string = ''; // Input for the title
}
