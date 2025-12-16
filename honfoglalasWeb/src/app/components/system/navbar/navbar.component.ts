import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { CommonModule, NgForOf } from '@angular/common';
import { NavItem } from '../../../interfaces/navItem';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgForOf, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  isAdmin = false;
  loggedUserName = '';

  constructor(
    private auth: AuthService
  ){}

  navItems: NavItem[] = []


  ngOnInit():void{
    this.auth.isLoggedIn$.subscribe(res =>{
      this.isLoggedIn = res
      this.isAdmin = this.auth.isAdmin()
      
      if(this.isLoggedIn){
        this.loggedUserName = this.auth.loggedUser()[0].name;
      }
      console.log(res)
      this.setupMenu(res);
    })
  }

  setupMenu(isLoggedIn:Boolean){
    this.navItems=[
      ...(this.isLoggedIn)?[
      {
        name: 'Kosár',
        icon: 'bi-cart',
        url:'cart',
        badge: 3
      },
      ...(this.isAdmin) ? [
        {
          name: 'Szállásaink',
          icon: 'bi-database',
          url:'cardview'
        },
        {
          name: 'Felhasználók kezelése',
          icon: 'bi-people',
          url:'users'
        },
        {
          name: 'Rendelések kezelése',
          icon: 'bi-receipt',
          url:'orders'
        },
        {
          name: 'Statisztika',
          icon: 'bi-graph-up-arrow',
          url:'stats'
        },
      ] : [
        {
          name: 'Rendeléseim',
          icon: 'bi-receipt',
          url:'myorders'
        },
      ], 
      {
        name: 'Profil',
        icon: 'bi-people-fill',
        url:'profile'
      },
      {
        name: 'Kilépés',
        icon: 'bi-box-arrow-left',
        url:'logout'
      },
    ] : [
      {
        name: 'Regisztráció',
        icon: 'bi-person-add',
        url:'registration'
      },
      {
        name: 'Belépés',
        icon: 'bi-box-arrow-in-right',
        url:'login'
      }
    ]
    ]
  }
}
