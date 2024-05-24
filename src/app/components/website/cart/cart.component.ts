import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private route:Router,private cartService:CartService,private productsrv :ProductService){}

  cartItems:any=[];
  quantityOfProduct:any;
  async ngOnInit(): Promise<void> {
    await this.getAllCartItems();
    this.cartItemsSummary();
  }

  getAllCartItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cartService.getAllCartItems().subscribe((res:any)=>{
        this.cartItems=res;
        this.AssignProduct();
        resolve(res);
      }
      )
    });
  }

  AssignProduct(){
    this.cartItems.forEach((cartItem: any)=> {
      this.productsrv.getProductById(cartItem.productId).subscribe((res:any)=>{
        cartItem.productDetails=res;
      },
      (error:any)=>{
        alert("Error fetching product details : "+error);
      })
      
    });
  }
  
orderId:any
 async onCheckOut(){
    this.cartService.onAddOrder().subscribe((res:any)=>{
      console.log(res)
      this.orderId=res.result.orderId;
      console.log(this.orderId);
      this.onAddOrderItems(this.orderId);
    })
     
   
    
    
  }
  onAddOrderItems(orderId:any){
    this.cartService.onAddOrderItems(orderId).subscribe((res:any)=>{
      alert("Order Confirmed");
      this.onEmptyCart();
      this.route.navigate(['order_items']);
    })
  }
  onEmptyCart(){
    this.cartService.onEmptyCart();
    // location.reload();
  }
  async onRemoveItem(productId:any){
    this.cartService.onRemoveItem(productId).subscribe(async (res:any)=>
    {

      alert("Item deleted successfully");
      await this.getAllCartItems();
      this.cartItemsSummary();
    })
  }

  onDecrementQuantity(productId:any){
    let item=this.cartItems.find((item:any)=>item.productId==productId);
    if(item && item.quantity>0){

      item.quantity=item.quantity-1;
     
      if(item.quantity==0)
      {
        
        this.onRemoveItem(productId);
      }
      
      this.cartService.updateItemQuantity(productId,item.quantity).subscribe((res:any)=>{
        this.cartItemsSummary();
      })
      
    }
  }

  onIncrementQuantity(productId:Number){
    let item=this.cartItems.find((item:any)=>item.productId==productId);
    if(item){
      item.quantity=item.quantity+1;
      this.cartService.updateItemQuantity(productId,item.quantity).subscribe((res:any)=>{
       this.cartItemsSummary();
      })
    }
  }

totalAmount:any;
  cartItemsSummary(){
    let totalprice=0;
    this.cartItems.forEach((cartItem: any)=> {
      
      let itemTotal=cartItem.quantity*cartItem.unitPrice;
      console.log(itemTotal);
       totalprice=totalprice+itemTotal;
    })
    this.totalAmount=totalprice;
  }
}
