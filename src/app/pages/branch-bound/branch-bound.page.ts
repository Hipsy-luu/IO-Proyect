import { Component, OnInit } from '@angular/core';
import { BranchBoundServiceService } from 'src/app/services/branch-bound-service.service';

@Component({
  selector: 'app-branch-bound',
  templateUrl: './branch-bound.page.html',
  styleUrls: ['./branch-bound.page.scss'],
})
export class BranchBoundPage implements OnInit {

  constructor(public branchBoundService : BranchBoundServiceService) {
    
  }

 ngOnInit() {}

 decrementNumofVar(){
   if(this.branchBoundService.numVar>2){
     this.branchBoundService.numVar--;
     this.branchBoundService.refreshVariables();
   }
 }
 incrementNumofVar(){
   this.branchBoundService.numVar++;
   this.branchBoundService.refreshVariables();
 }
 decrementNumofRest(){
   if(this.branchBoundService.numRest>2){
     this.branchBoundService.numRest--;
     this.branchBoundService.refreshConstraints();
   }
 }
 incrementNumofRest(){
   this.branchBoundService.numRest++;
   this.branchBoundService.refreshConstraints();
 }
}
