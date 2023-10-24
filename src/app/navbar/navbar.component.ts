import { Component } from '@angular/core';
import { AppstateService } from '../services/appstate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public appStateService: AppstateService){}
  
  title = 'Products';
  actions: Array<any> = [
    {title : "Home", route: "/home", icon: "home"},
    {title : "Products", route: "/products", icon: "search"},
    {title : "New Product", route: "/newProduct", icon: "safe"}
  ];

  currentAction:any;
  setCurrentAction(action:any){
    this.currentAction = action;
  }
}
