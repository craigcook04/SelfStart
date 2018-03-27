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
      console.log(isauth);
      //render the component if the session token is valid and the session is given to a user
      if(isauth.authorized && isauth.role == 'US'){
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
