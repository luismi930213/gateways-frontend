import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gateways',
    loadChildren: () => import('./modules/gateways/gateways.module')
      .then((m) => m.GatewaysModule),
  },
  {
    path: 'peripherals',
    loadChildren: () => import('./modules/peripherals/peripherals.module')
      .then((m) => m.PeripheralsModule),
  },
  { path: '', redirectTo: 'gateways/list', pathMatch: 'full' },
  { path: '**', redirectTo: 'gateways/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
