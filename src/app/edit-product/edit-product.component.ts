import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  productId!: number;
  formProductGroup!: FormGroup;
 
  constructor(private activateRoute:ActivatedRoute, private productService:ProductService, private formBuilder:FormBuilder){
    //Récupérer l'id depuis l'url à l'aide l'activateRoute
  }
  ngOnInit(): void {
    this.productId = this.activateRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: product => {
        this.formProductGroup = this.formBuilder.group({
          id: this.formBuilder.control(product.id, [Validators.required]),
          name: this.formBuilder.control(product.name),
          price: this.formBuilder.control(product.price),
          checked: this.formBuilder.control(product.checked)
        })
      },
      error: err => {console.log(err);}      
    });
  }
  updateProduct() {
    let product:Product = this.formProductGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: productUpdated => {
        alert(JSON.stringify(product) + ' have been updated with success')
      },
      error: err => {console.log(err);}
    })
  }
}
