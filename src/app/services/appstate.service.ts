import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class AppstateService {

  constructor() { }
    //$ à la fin de la variable pour indiquer un observable
  //! pour ignorer l'initialisation de la variable
  public products: Array<Product> = [];
  public keyword:string = '';
  currentPage:number = 1;
  pageSize:number = 3;
  totalPages:number = 0;
  totalProducts:number = 0;
  state:string ="ERROR";
  messageError:any;
}
