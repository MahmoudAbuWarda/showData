import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import IProduct from '../models/product.model';
import ICategory from '../models/category.model';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class CategoryComponent implements OnInit {
  isExpanded=false
  categoryDialog: boolean=false
  catgeoryID=0
 
  categorys:ICategory[]=[]

  category:ICategory
  selectedCategory: ICategory[]=[]

  submitted: boolean=false

  statuses: any[]=[]

  constructor(
    public connectionService:ConnectionService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
    ) {
      this.category={category:''}
      
     
     
   }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
      this.connectionService.getCategorys().subscribe(response=>{
          this.categorys=response
          
         })

    
  }

  openNew() {
   this.category={category:''}
    this.submitted = false;
    this.categoryDialog = true;

  }

  deleteselectedCategory() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Categories?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.selectedCategory.forEach(selected=>{
            this.connectionService.deleteCategory(`${selected.id}`).subscribe(response=>{
              console.log(response);
              
            })
            
          })
         this.categorys = this.categorys.filter(val =>!this.selectedCategory.includes(val));
         
     
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000});
      }
  });
  }

  editCategory(category: ICategory) {
     this.category= category
    this.categoryDialog = true;


  }

  deleteCategory(category: ICategory){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.category + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.connectionService.deleteCategory(`${category.id}`).subscribe(response=>{
          console.log(response);
          
        })
          this.categorys = this.categorys.filter(val => val.id !== category.id);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Category Deleted', life: 3000});
      }
  });
  }

  hideDialog() {
    this.categoryDialog = false;
        this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;

    if (this.category.category.trim()&& this.category.slug) {
        

        if (this.category.id) {
         
          
           this.connectionService.updateCategory(this.category).subscribe()
            this.categorys[this.findIndexById(`${this.category.id}`)] = this.category;
            
            
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Category Updated', life: 3000});
        }
        else {
          

            
            this.connectionService.newCategory(this.category).subscribe(response=>{
              
                this.categorys.push(response)
             
              
              
            })
           
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Category Created', life: 3000});
        }

        this.categorys = [...this.categorys];
        this.categoryDialog = false;
        this.category = {category:''};
    }
  }
  // updateCategory(category:ICategory){
  //   this.submitted = true;

  //       if (this.category.category.trim()&&this.category.slug) {
           
             
              
  //              category = this.category;

  //               this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            
           

  //           this.categorys = [...this.categorys];
  //           this.categoryDialog = false;
  //           this.category = {category:''};
  //       }
  // }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categorys.length; i++) {
        if (`${this.categorys[i].id}` === id) {
            index = i;
            break;
        }
    }

    return index;
  }

 

  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  expandTable(catgeoryID:number){
    
      this.isExpanded= !this.isExpanded
    
      this.catgeoryID=catgeoryID
      if(!this.isExpanded){
        this.catgeoryID=0
      }
  }
}
