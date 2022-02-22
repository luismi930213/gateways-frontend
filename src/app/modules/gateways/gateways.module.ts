import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewaysComponent } from './gateways.component';
import { GatewaysRoutingModule } from './gateways-routing.module';
import { ListComponent } from './list/list.component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiBadgeModule, TuiDataListWrapperModule, TuiFieldErrorModule, TuiInputDateModule, TuiInputModule, TuiIslandModule, TuiSelectModule } from '@taiga-ui/kit';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule, TuiDataListModule } from '@taiga-ui/core';
import { GatewayService } from 'src/app/_core/services/gateway.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    GatewaysComponent,
    ListComponent,
    AddComponent,
    DetailsComponent,
  ],
  imports: [
    HttpClientModule,
    GatewaysRoutingModule,
    CommonModule,
    TuiButtonModule,
    FormsModule,
    TuiSelectModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiTableModule,
    TuiIslandModule,
    TuiInputDateModule,
    ReactiveFormsModule,
    TuiFieldErrorModule,
    TuiBadgeModule
  ],
  providers: [
    GatewayService
  ]
})
export class GatewaysModule { }
