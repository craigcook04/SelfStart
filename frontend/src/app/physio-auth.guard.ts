import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAccountsService } from './user-accounts.service';


@Injectable()
export class PhysioAuthGuard implements CanActivate {
  constructor(private userAccountService: UserAccountsService, private router: Router) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(this.userAccountService.LoggedIn()) {
        var isauth = await this.userAccountService.GetAuthorization();
        console.log(isauth);
        //render the component if the session token is valid and the session is given to a physiotherapist
        if(isauth.authorized && isauth.role == 'PH'){
          return true;
        }
        else if(isauth.authorized && isauth.role == "AD") {
          this.router.navigate(['../admin/wrongaccount']);
        }
        else{
          this.router.navigate(['../unauthorized']);
        }
      }
      else{
        this.router.navigate(['../unauthorized']);        
      }
  }
}
