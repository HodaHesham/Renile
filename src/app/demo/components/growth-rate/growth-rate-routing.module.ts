import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GrowthRateComponent } from './growth-rate.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: GrowthRateComponent },
  ])],
  exports: [RouterModule]
})
export class GrowthRateRoutingModule { }
