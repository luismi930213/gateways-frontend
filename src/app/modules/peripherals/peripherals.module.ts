import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeripheralsComponent } from './peripherals.component';
import { ListComponent } from './list/list.component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { PeripheralsRoutingModule } from './peripherals-routing.module';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiIslandModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { PeripheralService } from 'src/app/_core/services/peripheral.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PeripheralsComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    PeripheralsRoutingModule,
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
    HttpClientModule
  ],
  providers: [
    PeripheralService
  ]
})
export class PeripheralsModule { }
