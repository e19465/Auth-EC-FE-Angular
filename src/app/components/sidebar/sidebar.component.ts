import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  links: SidebarLink[] = [
    {
      path: '/admin-only',
      label: 'Admin',
    },
    {
      path: '/admin-and-teacher',
      label: 'Admin & Teacher',
    },
    {
      path: '/teacher-only',
      label: 'Teacher',
    },
    {
      path: '/apply-for-maternity-leave',
      label: 'Maternity Leave',
    },
    {
      path: '/library-members-only',
      label: 'Library Members',
    },
    {
      path: '/under-ten-female-only',
      label: 'Under 10 Female',
    },
    {
      path: '/student-only',
      label: 'Student',
    },
  ];

  constructor() {}
}
