import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PeripheralsComponent } from './peripherals.component';


const routes: Routes = [
  {
    path: '', component: PeripheralsComponent,
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
export class PeripheralsRoutingModule { }
