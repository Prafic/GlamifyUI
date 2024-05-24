import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../components/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../components/models/login-request.model';
import { LoginResponse } from '../components/models/login-response.model';
import { Constant } from './constant/Constant';
import { Signup } from '../components/models/register.model';
import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '../components/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // $user = new BehaviorSubject<any|undefined>(undefined);
 initialUser: AuthUser = {
    email: '',
    role: '' 
  };
 $userSubject = new BehaviorSubject<User | undefined>(this.initialUser);
   decodedToken: { [key: string]: string; } | undefined;
   $role=new BehaviorSubject<string | undefined>(undefined);
  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(Constant.API_END_POINT + Constant.METHODS.LOGIN_USER,request);
  }

  register(request: Signup): Observable<string> {
    return this.http.post<string>(Constant.API_END_POINT + Constant.METHODS.REGISTER_USER, {
      name: request.name,
      email: request.email,
      password: request.password,
      confirmPassword: request.confirmPassword,
      phoneNumber: request.phoneNumber,
      address: request.address
    });
  }

  isLoggedIn(){
    var isExpired = false;
    const token = this.cookieService.get('Authorization');
    const jwtToken=token.slice(7,token.length-1);
    console.log(jwtToken);
    console.log(token);
    if (jwtToken) {
      
      const payload = atob(jwtToken.split('.')[1]);
      
      const parsedPayload = JSON.parse(payload); // convert payload into an Object
      
      isExpired = parsedPayload.exp > Date.now() / 1000; // check if token is expired
      
    }
    return isExpired;
  }

  getAllCustomers(){
      return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_USERS);
    
  }
  decodeToken(token:any){
    this.decodedToken =jwtDecode(token);
    console.log(this.decodeToken);
    this.initialUser.role=this.decodedToken ? this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : undefined;

    this.$userSubject.next(this.initialUser);
    this.$role.next(this.initialUser.role);
    console.log(this.initialUser.role);
    localStorage.setItem('role',this.initialUser.role);
  }
  isAdmin(){
    if(localStorage.getItem('role')==='Admin'){
      return true;
    }
    // const token = this.cookieService.get('Authorization');
    // console.log(token);
    // var isAdmin = false;
    // const jwtToken=token.slice(7,token.length-1);
    // console.log(jwtToken);
    // this.decodeToken(jwtToken);
    // this.$userSubject.next(this.initialUser);
    // if(this.initialUser.role=='Admin'){
    //   isAdmin=true;
    // }
    // return true;
    // var isAdmin = false;
    // const token = this.cookieService.get('Authorization');
    // console.log(token);
    // const jwtToken=token.slice(7,token.length-1);
    // console.log(jwtToken);
    // if(jwtToken){
    //   this.decodedToken =jwtDecode(token);
    //   this.initialUser.role=this.decodedToken ? this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : undefined;

    // this.$userSubject.next(this.initialUser);
    // console.log(this.initialUser.role);
    // if(this.initialUser.role==='Admin'){
    //   isAdmin=true;
    // }
    // }

    // return isAdmin;
    return false;
  }
  // setUser(user:any): void {
  //   this.$user.next(user);
    
  //   localStorage.setItem('user-email', user.email);

  // }

  user(): Observable<any | undefined> {
    return this.$userSubject.asObservable();
  }

  getUser(): any | undefined {
    const role = localStorage.getItem('role');
    console.log(role);
    if (role) {
      const user: AuthUser = {
        email:role,
        role: role,
      };

      return user;
    }

    return undefined;
  }



  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.initialUser.role=undefined;
    this.$userSubject.next(this.initialUser);
  }
}
