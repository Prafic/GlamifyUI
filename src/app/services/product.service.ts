import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getAllProducts() {
    return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS);
  }

  getProductByCategoryId(categoryId: any) {
    return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_PRODUCTS_BY_CATEGORY + `/GetAllProductsByCategoryId?categoryId=${categoryId}`);
  }

  getProductById(obj: any) {
    return this.http.get(Constant.API_END_POINT + `Products/${obj}`);
  }
  updateProduct(productId: Number, obj: any) {
   

    return this.http.put(Constant.API_END_POINT + Constant.METHODS.UPDATE_PRODUCT + `/${productId}`, obj);
  }

  deleteProduct(productId: any) {
    
    return this.http.delete(Constant.API_END_POINT + Constant.METHODS.DELETE_PRODUCT + `/${productId}`, { observe: 'response' })
      .subscribe((res: any) => {
        alert("Product deleted");
      }
      )
  }
  onProductSave(obj: any) {
   
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT, obj,{ observe:'response' });
  }

  searchProduct(searchString: string) {
    console.log(searchString);
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.SEARCH_PRODUCT + `/search/${searchString}`);
  }
}
