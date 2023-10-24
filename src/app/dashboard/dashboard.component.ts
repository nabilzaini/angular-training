import { Component } from '@angular/core';
import { AppstateService } from '../services/appstate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(public appStateService: AppstateService){}

  totalProductsChecked() {
    return this.appStateService.products.filter(p => p.checked).length;
  }
}
