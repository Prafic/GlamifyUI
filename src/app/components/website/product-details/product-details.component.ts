import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product:any;
  constructor(private authService:AuthService,private route:ActivatedRoute,private productsrv:ProductService,private router:Router,private cartservice:CartService){}
  ngOnInit(): void {
  const routeParams=this.route.snapshot.paramMap;
    const productId=Number(routeParams.get('productId'));
    this.getProductById(productId);
}
 onAddToCart(productId:string){
  if(this.authService.isLoggedIn()){
    this.cartservice.onAddToCart(productId).subscribe((res:any)=>{
      alert("Product Added to cart!");
      this.router.navigate(['/cart']);
    })
  }
   
    
}


getProductById(productId:any){
 this.productsrv.getProductById(productId).subscribe((res:any)=>{
  
    this.product=res;
 });

}
}