import { ActivatedRouteSnapshot,RouterStateSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{

  constructor(private authService:AuthService, private router: Router) {}
  user?:any;
  canActivate(): boolean {
  
    // return this.checkAuth();
    // console.log(this.authService.$isAdmin);
    if(!this.authService.isAdmin()){
      this.router.navigate(['login']);
      return false; 
    }
    // console.log(this.authService.$role);
   return true;

  }

}


