import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeathRateComponent } from './death-rate.component';
@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DeathRateComponent }])],
  exports: [RouterModule],
})
export class DeathRateRoutingModule {}
