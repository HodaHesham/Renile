import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeathRateComponent } from './death-rate.component';
import { DeathRateRoutingModule } from './death-rate-routing.module';
import { ChartModule } from 'primeng/chart';
import { CrudModule } from '../pages/crud/crud.module';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';



@NgModule({
  imports: [
    CommonModule,
    DeathRateRoutingModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    ToolbarModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    CrudModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    CalendarModule,
    DividerModule,
    DialogModule,
  ],
  declarations: [DeathRateComponent],
})
export class DeathRateModule { }
