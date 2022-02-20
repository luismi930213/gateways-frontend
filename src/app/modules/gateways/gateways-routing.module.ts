import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatewaysComponent } from './gateways.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', component: GatewaysComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      }
    ]
  },
  { path: '', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewaysRoutingModule { }
