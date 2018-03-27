import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAccountsService } from './user-accounts.service'

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private userAccountService: UserAccountsService) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.userAccountService.LoggedIn()) {
      var isauth = await this.userAccountService.GetAuthorization();
      if(isauth.authorized){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }

  }
}
