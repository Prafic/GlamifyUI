import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Signup } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupObj:Signup={
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    phoneNumber:"",
    address:""
  }

  constructor(private authService:AuthService, private route:Router){}

  onSubmit(){
    
    this.authService.register(this.signupObj).subscribe((res:any)=>{
      console.log(res);
      alert("Registered successfully");
      this.route.navigate(['/login']);
    })
  }
}
