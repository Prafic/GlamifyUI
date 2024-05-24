import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    email: "",
    password: ""
  }



  constructor(private route: Router, private authsrv: AuthService, private cookie: CookieService) { }



  onLogin() {

    this.authsrv.login(this.loginObj).subscribe({
      next: (response) => {
        if(response!=null){
          console.log(response);
        this.cookie.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict');
        this.authsrv.decodeToken(response.token)
        let user = this.authsrv.getUser();
        console.log(user);
        if (user.role == 'Admin') {
          alert("Login Admin successfully");
          this.route.navigate(['/admin/products']);
        } else if (user.role == 'Customer') {
          alert("Login User successfully");
          this.route.navigate(['/']);
        }
        }else{
          alert("Invalid credentials");
        }
      }
    })
  }


}
