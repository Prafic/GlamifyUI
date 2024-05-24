import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {
  productList:any=[];
  constructor(private productsrv:ProductService,private route:ActivatedRoute){
    const routeParams=this.route.snapshot.paramMap;
    const searchString=String(routeParams.get('searchString'));
    
   this.productsrv.searchProduct(searchString).subscribe((res: any) => {
      this.productList = res;
      
      // location.reload();
    })
  }
}
