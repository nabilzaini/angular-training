import { Component } from '@angular/core';
import { AppstateService } from '../services/appstate.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {
  constructor(public appStateService: AppstateService){}

}
