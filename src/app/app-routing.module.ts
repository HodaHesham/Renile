import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppLayoutComponent,
          children: [
            {
              path: '',
              loadChildren: () =>
                import('./demo/components/dashboard/dashboard.module').then(
                  (m) => m.DashboardModule,
                ),
            },
            {
              path: 'feed-rate',
              loadChildren: () =>
                import('./demo/components/feed-rate/feed-rate.module').then(
                  (m) => m.FeedRateModule,
                ),
            },
            {
              path: 'Ponds',
              loadChildren: () =>
                import('./demo/components/death-rate/death-rate.module').then(
                  (m) => m.DeathRateModule,
                ),
            },
            {
              path: 'growth-rate',
              loadChildren: () =>
                import('./demo/components/growth-rate/growth-rate.module').then(
                  (m) => m.GrowthRateModule,
                ),
            },
            {
              path: 'toxic-ammonia',
              loadChildren: () =>
                import('./demo/components/toxic-ammonia/toxic-ammonia.module').then(
                  (m) => m.ToxicAmmoniaModule,
                ),
            },
          ],
        },
        // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
        // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
