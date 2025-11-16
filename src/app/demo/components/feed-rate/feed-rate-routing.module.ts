import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedRateComponent } from './feed-rate.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FeedRateComponent },
  ])],
  exports: [RouterModule]
})
export class FeedRateRoutingModule { }
