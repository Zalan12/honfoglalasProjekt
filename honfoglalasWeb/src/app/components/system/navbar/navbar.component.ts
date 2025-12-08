import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgForOf } from '@angular/common';
import { NavItem } from '../../../interfaces/navItem';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navItems: NavItem[] = []
}
