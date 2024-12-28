import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimReqUtils } from '../../shared/utils/claimReqUtils';

interface SidebarLink {
  path: string;
  label: string;
  claimReq: Function;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive,
    HideIfClaimsNotMetDirective,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  links: SidebarLink[] = [
    {
      path: '/admin-only',
      label: 'Admin',
      claimReq: claimReqUtils.adminOnly,
    },
    {
      path: '/admin-and-teacher',
      label: 'Admin & Teacher',
      claimReq: claimReqUtils.adminAndTeacher,
    },
    {
      path: '/teacher-only',
      label: 'Teacher',
      claimReq: claimReqUtils.teacherOnly,
    },
    {
      path: '/apply-for-maternity-leave',
      label: 'Maternity Leave',
      claimReq: claimReqUtils.maternityLeaveApplicable,
    },
    {
      path: '/library-members-only',
      label: 'Library Members',
      claimReq: claimReqUtils.libraryMembersOnly,
    },
    {
      path: '/under-ten-female-only',
      label: 'Under 10 Female',
      claimReq: claimReqUtils.genderFemaleAgeUnderTen,
    },
    {
      path: '/student-only',
      label: 'Student',
      claimReq: claimReqUtils.studentOnly,
    },
  ];

  constructor() {}
}
