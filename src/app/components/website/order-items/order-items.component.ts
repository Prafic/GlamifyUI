import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent {
  groupedOrders:{[Key:string]:any}=[];
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.getMyOrders();
   }

  getMyOrders(){
    this.orderService.getMyOrders().subscribe((res:any)=>{
      console.log(res);
      let groupedOrders=res.result.reduce((r:any,a:any)=>{
        r[a.orderId]=[...r[a.orderId] || [] ,a];
        
        return r;
      },{});
      console.log(groupedOrders);
      this.groupedOrders=groupedOrders;
    })
  }
}
