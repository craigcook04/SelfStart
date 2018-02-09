import { Component, OnInit } from '@angular/core';
import {RehabPlansService} from '../rehab-plans.service'
@Component({
  selector: 'app-rehab-plans',
  templateUrl: './rehab-plans.component.html',
  styleUrls: ['./rehab-plans.component.css']
})
export class RehabPlansComponent implements OnInit {

  constructor(private rehabPlansService: RehabPlansService) { }
  rehabPlans: Object[];

  ngOnInit() {
    this.rehabPlansService.getPlans().subscribe(data => {
      console.log(data);
      this.rehabPlans = Object.assign([], data.rehabPlans)
    });
  }

}
