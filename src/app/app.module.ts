import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';     
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CategoryComponent } from './category/category.component';
import {SidebarModule} from 'primeng/sidebar';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import {StyleClassModule} from 'primeng/styleclass';
import { InputTextModule } from "primeng/inputtext";
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    SidebarModule,
    StyleClassModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
