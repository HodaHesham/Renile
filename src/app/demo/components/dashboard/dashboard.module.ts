import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CrudModule } from '../pages/crud/crud.module';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { AddFarmComponent } from './add-farm/add-farm.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { EditFarmComponent } from './edit-farm/edit-farm.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        DividerModule,
        ToolbarModule,
        StyleClassModule,
        ToastModule,
        PanelMenuModule,
        ButtonModule,
        CrudModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        ReactiveFormsModule,
        RadioButtonModule,
        InputNumberModule,
        CalendarModule,
        DialogModule,

    ],
    declarations: [DashboardComponent ,AddFarmComponent,FarmDetailsComponent,EditFarmComponent],
    providers: [MessageService]
})
export class DashboardModule { }
