import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


import IProduct from '../models/product.model';
import ICategory from '../models/category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ProductComponent implements OnInit {

  productDialog: boolean=false
  
  products:IProduct[]=[]
  categorys:ICategory[]=[]

  product:IProduct
  selectedProducts: IProduct[]=[]

  submitted: boolean=false

  statuses: any[]=[]

  constructor(
    public connectionService:ConnectionService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
    ) {
      this.product={id:'',name:'',price:0,category:null}
      
     
     
   }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
      this.connectionService.getCategorys().subscribe(response=>{
          this.categorys=response
          
         })

    this.connectionService.getProducts().subscribe(response=>{
      this.products=response
      
      
    } 
   )
   
   // this.onGetProducts()
    
    
   
    
    
  }

  openNew() {
   this.product={id:'',name:'',price:0,category:null}
    this.submitted = false;
    this.productDialog = true;

  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.selectedProducts.forEach(selected=>{
            this.connectionService.deleteProduct(selected.id).subscribe()
            
          })
          this.products = this.products.filter(val =>!this.selectedProducts.includes(val));
         
     
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
  }

  editProduct(product: IProduct) {
     this.product= product
    this.productDialog = true;


  }

  deleteProduct(product: IProduct){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.connectionService.deleteProduct(product.id).subscribe()
          this.products = this.products.filter(val => val.id !== product.id);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
  }

  hideDialog() {
    this.productDialog = false;
        this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()&& this.product.description &&this.product.price&&this.product.category ) {
        

        if (this.product.id) {
         
           // this.connectionService.updateProduct(this.product).subscribe()
           
            this.products[this.findIndexById(this.product.id)] = this.product;

            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
          

            
            this.connectionService.newProduct(this.product).subscribe(response=>{
              
                this.products.push(response)
             
              
              
            })
           
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            
          }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {id:'',name:'',price:0,category:null};
    }
  }
 

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }



  getEventValue($event:any) :string {
    return $event.target.value;
  } 

 
}
