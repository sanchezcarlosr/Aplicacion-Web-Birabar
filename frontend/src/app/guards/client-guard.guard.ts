import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuardGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.userLoggedIn() && this.loginService.rolLogged() == 'Cliente'){
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
  
}
