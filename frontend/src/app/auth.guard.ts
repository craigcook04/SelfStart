import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAccountsService } from './user-accounts.service'

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private userAccountService: UserAccountsService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.userAccountService.LoggedIn()) {
       this.userAccountService.GetAuthorization().subscribe(data => {
       var retObj: any = data;
      })
    }
    
    return false;
     
  }
}
