import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  public productForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private prodcutService:ProductService){}

  ngOnInit(): void {
   this.productForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    price: this.formBuilder.control(0),
    checked: this.formBuilder.control(false)
   });
  }
  saveProduct() {
   let product:Product = this.productForm.value;
   this.prodcutService.saveProduct(product)
   .subscribe({
    next: data => {
      alert(JSON.stringify(data))
    },
    error: err => {
      console.log(err);
    }
   });
  }
}
