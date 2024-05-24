import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { AuthUser } from '../models/auth.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user?:AuthUser;
  $auth?:AuthUser;
  categoryList:any=[];
  searchString:string="";
  constructor(private authService:AuthService,private router:Router,private cateService:CategoryService){}

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next:(response)=>{
        this.user=response.role;
        console.log(this.user);
      }
    });
  
  this.user=this.authService.getUser();
  console.log("user "+this.user?.role);

  this.getAllCategory();
}
  onLogout():void{
    this.authService.logout();
    this.router.navigate(['/']);
    // console.log(this.user);
  }
  getAllCategory(){
    this.cateService.getAllCategory().subscribe((res:any)=>{
      this.categoryList=res;
    })
  }

  searchProducts(){
    this.router.navigate([`/search/products/${this.searchString}`]);
  }
}
