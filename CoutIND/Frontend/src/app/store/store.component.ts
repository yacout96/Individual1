import { Component, OnInit } from '@angular/core';
import { environment } from  '../../environments/environment.prod';

import { MENU_ITEMS } from './store-menu';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';

import {HttpClient} from "@angular/common/http";
import {ItemModule} from "./item/item.module";
import {Router} from "@angular/router";

@Component({
    selector: 'app-store',
    template: `
    <ngx-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet>
          <table class="table-hover">
              <thead>
              <tr>
                  <td>
                      <label>Product Name</label>
                      <input type="text" [(ngModel)]="nameOfProduct" id="nameInput">
                  </td>
                  <td>
                      <label>Product Price</label>
                      <input type="number" [(ngModel)]="priceOfProduct" id="priceInput">
                  </td>
                  <label>ADD</label>
                  <br>
                  <button class="btn btn-success" (click)="addProduct()" id="editOrAdd">
                      +
                  </button>
                  
              </tr>
              <tr>
                  <th>
                      Name
                  </th>
                  <th>
                      Price
                  </th>
                  <th>
                      Created At 
                  </th>
                  <th>
                      Updated At 
                  </th>
                  <th>
                      Seller Name
                  </th>
                  <th>
                      Actions
                  </th>
              
              </tr>
              </thead>
              
              <tbody>
              <tr  *ngFor="let item of this.Items" id="{{counter}}">
                  <td>{{item.name}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.createdAt}}</td>
                  <td>{{item.updatedAt}}</td>
                  <td>{{item.sellerName}}</td>
                  <td>
                      
                      <button class="bbtn btn-primary"(click)="editItem(item._id)"> Edit </button>
                      <button class="bbtn btn-primary"(click)="deleteItem(item._id)"> Delete </button>
                  
                  </td>
              </tr>
             
              </tbody>
              
          </table>
      </router-outlet>
    </ngx-main-layout>
  `
})
export class StoreComponent implements OnInit {
    menu: NbMenuItem[];
    idForEdit:string;
    editedItem:any;
    //array:ItemModule[];
    Items = [];
    counter = 0;
    nameOfProduct:string;
    priceOfProduct:number;
    currentuser=JSON.parse(localStorage.getItem("user")).username;

    constructor(private http:HttpClient, private router: Router){



    }



    ngOnInit() {
        this.menu = MENU_ITEMS;
        this.getALLItems().subscribe(res=>{
            this.Items=res['data'];
            console.log(res);
        })
    }
    getALLItems(){
    return this.http.get(environment.apiUrl+'product/getProducts');
    }





    addProduct() {
        var ajaxtype =
       {
           headers:
           {
                'Content-Type': 'application/json'
            }
       }
            if ((<HTMLInputElement>document.getElementById("editOrAdd")).value == "edit") {
            console.log(this.nameOfProduct);
            console.log(this.priceOfProduct);
            if(this.nameOfProduct==undefined){
                this.nameOfProduct= this.editedItem.name;
            }
            if(this.priceOfProduct==undefined){
                this.priceOfProduct=this.editedItem.price;
            }
            var productinfo = JSON.stringify({
                name: this.nameOfProduct,
                price: this.priceOfProduct,
                sellerName: this.currentuser,
                updatedAt:Date.now(),
                id:this.editedItem.id
            });
            console.log(this.nameOfProduct);
            console.log(productinfo);
            this.http.patch(environment.apiUrl+'/product/updateProduct/'+this.idForEdit,productinfo,ajaxtype).subscribe(res=>{
              location.reload();
              console.log(res); 
          });
            (<HTMLInputElement>document.getElementById("editOrAdd")).value="add";
        }
        else {

            var productinfo = JSON.stringify({     
                name: this.nameOfProduct,          
                price: this.priceOfProduct,        
                sellerName: this.currentuser,
                id:this.counter
            });
            this.counter++;
            this.http.post(environment.apiUrl + '/product/createProduct/', productinfo, ajaxtype).subscribe(
                res => {
                    console.log(res);
                    location.reload();
                }
            )
        }
    }
    deleteItem(idObject:string){

        var Item ;
        this.http.get(environment.apiUrl+'/product/getProduct/'+idObject).subscribe(res=>{
           Item=res['data'] ;
            if(Item.sellerName==this.currentuser.toLowerCase()) {
                this.http.delete(environment.apiUrl + '/product/deleteProduct/' + idObject).subscribe(res => {
                    console.log(res)
                    location.reload();
                })
            }
            else{
                window.alert("You ARE NOT AUTHORIZED FOR THIS ACTION");
            }
        });


    }
editItem(idObject:string){
    var item;
        this.http.get(environment.apiUrl+'/product/getProduct/'+idObject).subscribe(res=> {
            item = res['data'];
            console.log(res);
            if(item.username=this.currentuser.toLowerCase()) {
                (<HTMLInputElement>document.getElementById("nameInput")).value = item.name;
                (<HTMLInputElement>document.getElementById("priceInput")).value = item.price;
                (<HTMLInputElement>document.getElementById("editOrAdd")).value = "edit";
                this.idForEdit = idObject;
                this.editedItem = item;
            }
            else {
                window.alert("You ARE NOT AUTHORIZED FOR THIS ACTION");
            }
        })

}




}