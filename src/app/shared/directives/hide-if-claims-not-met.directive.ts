import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHideIfClaimsNotMet]',
  standalone: true,
})
export class HideIfClaimsNotMetDirective implements OnInit {
  @Input('appHideIfClaimsNotMet') claimReq!: Function;

  constructor(
    private authService: AuthService,
    private elementRe: ElementRef
  ) {}

  ngOnInit(): void {
    const claims = this.authService.getUserClaims();
    if (!this.claimReq(claims)) {
      this.elementRe.nativeElement.style.display = 'none';
    }
  }
}
