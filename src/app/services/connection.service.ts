import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IProduct from '../models/product.model';
import { environment } from 'src/environments/environment';
import ICategory from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  apiUrl=environment.apiUrl
  // private products:IProduct[]=[{
  //   id:"1",
  //   name:"string",
  //   price:2,
  //   description:"string",
  //   created_at:"string",
  //   updated_at:"string",
  //   category:"string"
  // },{
  //   id:"1",
  //   name:"ew",
  //   price:8,
  //   description:"ew",
  //   created_at:"ew",
  //   updated_at:"ew",
  //   category:"ew"
  // },{
  //   id:"1",
  //   name:"ew",
  //   price:8,
  //   description:"ew",
  //   created_at:"ew",
  //   updated_at:"ew",
  //   category:"ew"
  // }]
  constructor(private http:HttpClient) {
   }
       
   getProducts(){
       return   this.http.get<IProduct[]>(`${this.apiUrl}products`)
       
   }
   getCategorys(){
     return this.http.get<ICategory[]>(`${this.apiUrl}product-categories`)
   }

   deleteProduct(id:string){
     return this.http.delete(`${this.apiUrl}products/${id}`)
   }
   deleteCategory(id:string){
    return this.http.delete(`${this.apiUrl}product-categories/${id}`)
  }

  newProduct(product:IProduct){
    return this.http.post<IProduct>(`${this.apiUrl}products`,product)
  }
  newCategory(category:ICategory){
    return this.http.post<ICategory>(`${this.apiUrl}product-categories`,category)
  }
  updateProduct(product:IProduct){
    return this.http.patch(`${this.apiUrl}products?${product.id}`,product)
  }
  updateCategory(category:ICategory){
    return this.http.patch(`${this.apiUrl}product-categories/${category.id}`,category)
  }
   

}
