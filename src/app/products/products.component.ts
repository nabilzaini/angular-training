import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { AppstateService } from '../services/appstate.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(private productService: ProductService, private router:Router, public appStateService: AppstateService){}

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
   // this.appStateService.state = "LOADING"; remplacer par l'intercepteur
    this.productService.getProducts(this.appStateService.keyword, this.appStateService.currentPage, this.appStateService.pageSize)
    .subscribe({
      next: response => {
          this.appStateService.products  = response.body as Product[];
          this.appStateService.totalProducts = parseInt(response.headers.get("x-total-count")!);
          this.appStateService.totalPages = Math.floor(this.appStateService.totalProducts/this.appStateService.pageSize);

          if(this.appStateService.totalProducts % this.appStateService.pageSize != 0){
            this.appStateService.totalPages = this.appStateService.totalPages + 1;
          }
          this.appStateService.state = "LOADED"; 
          console.log(this.appStateService.state)
      },
      error: err => {
        this.appStateService.state = "ERROR";
        this.appStateService.messageError = err;
      }
    });
  }

  handlePage(indexPage: number) {
    this.appStateService.currentPage = indexPage;
    this.getProducts();
  }

    
  handleCheckProduct(product: Product){
    this.productService.checkedProduct(product)
    .subscribe({
      next: updatedProduct => {
        product.checked = !product.checked
        }
      }
    )
  }

  deleteProduct(product: Product){
    if(confirm("Etes vous sûre ?"))
    this.productService.deleteProduct(product)
    .subscribe({
      next: data => {
        this.getProducts();
      }
    });
  }

  editProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
