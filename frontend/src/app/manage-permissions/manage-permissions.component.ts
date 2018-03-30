import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss']
})

export class ManagePermissionsComponent implements OnInit {
  roles: any;
  permissions: any;
  currentRole: any;
  allPermissions: any;
  difPermissions: any;
  constructor(private rolesService: RolesService) { }

  ngOnInit() {
    this.difPermissions = [];
    this.rolesService.GetAllRoles().subscribe(data => {
      var retObj: any = data;
      console.log(retObj);
      this.roles = retObj.roles;

      this.rolesService.GetAllPermissions().subscribe(data => {
        var retObj1: any = data;
        this.allPermissions = retObj1.permissions; 

        this.setRolePermissions(this.roles[0]);
      });
    });

    


  }

  setRolePermissions(role) {
    this.currentRole = role;
    var toRemove = this.currentRole.permission;
    this.difPermissions = this.allPermissions;
    for( var i=this.difPermissions.length - 1; i>=0; i--){
      for( var j=0; j<toRemove.length; j++){
          if(this.difPermissions[i] && (this.difPermissions[i]._id === toRemove[j]._id)){
           this.difPermissions.splice(i, 1);
         }
       }
   }
    console.log(this.difPermissions);
  }

  

}
