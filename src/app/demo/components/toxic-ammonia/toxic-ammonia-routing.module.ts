import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToxicAmmoniaComponent } from './toxic-ammonia.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ToxicAmmoniaComponent },
  ])],
  exports: [RouterModule]
})
export class ToxicAmmoniaRoutingModule { }
