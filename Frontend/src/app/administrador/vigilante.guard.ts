import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})

export class VigilanteGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const validar = localStorage.getItem('isAdmin')
      if (validar!=null && validar != ""){//vericamos que existe un token en localstorage
        if(validar=="true"){
          return true
        }else{
          return false
        }
          
      }else{
        return false;
      }

  }

  
}