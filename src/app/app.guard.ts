import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { idUserGlobal } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(idUserGlobal != ''){
        return true;
      }else{
        alert('Bạn chưa đăng nhập!')
        return false;
      }
  }
  
}
