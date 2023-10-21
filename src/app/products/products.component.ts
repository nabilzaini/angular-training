import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{


  //$ à la fin de la variable pour indiquer un observable
  //! pour ignorer l'initialisation de la variable
  public products: Array<Product> = [];
  public keyword:string = '';
  currentPage:number = 1;
  pageSize:number = 3;
  totalPages:number = 0;


  constructor(private productService: ProductService, private router:Router){}

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(this.keyword, this.currentPage, this.pageSize)
    .subscribe({
      next: response => {
          this.products  = response.body as Product[];
          let totalElements:number = parseInt(response.headers.get("x-total-count")!);
          this.totalPages = Math.floor(totalElements/this.pageSize);

          if(totalElements % this.pageSize != 0){
            this.totalPages = this.totalPages + 1;
          }
      },
      error: err => {
        console.log("Erreur");
      }
    });
  }

  handlePage(indexPage: number) {
    this.currentPage = indexPage;
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
        this.products = this.products.filter(p => p.id != product.id)
      }
    });
  }

  editProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
